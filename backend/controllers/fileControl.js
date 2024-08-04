const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const File = require('../models/fileModel');
const Folder = require('../models/folderModel');
require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3Api = async (req, res) => {
  const { userId, folderId } = req.body;
  const file = req.file;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the folder exists
    const folder = await Folder.findByPk(folderId);
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
     // ACL: 'public-read',
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    // Save file metadata in the database
    const newFile = await File.create({
      name: file.originalname,
      size: file.size,
      url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`,
      userId,
      folderId,
    });

    res.status(201).json(newFile);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { uploadToS3Api };

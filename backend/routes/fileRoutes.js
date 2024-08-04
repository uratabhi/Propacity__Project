const express = require('express');
const multer = require('multer');
const { uploadToS3Api } = require('../controllers/fileControl');
require('dotenv').config();

const router = express.Router();

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Route to handle file upload
router.post('/upload', upload.single('file'), uploadToS3Api);

module.exports = router;

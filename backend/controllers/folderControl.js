const Folder = require("../models/folderModel");
const User = require("../models/userModel");

const createFolderApi = async (req, res) => {
  const {parentId, name } = req.body;
  try {
    console.log('Request Body:', req.body);
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the folder
    const folder = await Folder.create({ name, userId, parentId: parentId || null });
    res.status(201).json(folder);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Folder name must be unique" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Create Subfolder API
const createSubFolderApi = async (req, res) => {
  const { parentId, name } = req.body;
  try {
    const userId = req.user.id;

    // Check if the parent folder exists
    const parentFolder = await Folder.findByPk(parentId);
    if (!parentFolder) {
      return res.status(404).json({ error: "Parent folder not found" });
    }

    // Check if the user has permission to create a subfolder in the parent folder
    if (parentFolder.userId !== userId) {
      return res.status(403).json({ error: "Permission denied" });
    }

    // Create the subfolder
    const subfolder = await Folder.create({ name, userId, parentId });
    res.status(201).json(subfolder);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Folder name must be unique" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};


const renameFolder = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // Find the folder by ID
    const folder = await Folder.findByPk(id);
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    // Update the folder name
    folder.name = name;
    await folder.save();

    res.status(200).json({ message: 'Folder renamed successfully', folder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFoldersApi = async (req, res) => {
  try {
    const userId = req.user.id;
    const folders = await Folder.findAll({
      where: { userId },
    });

    res.status(200).json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
}



const getSubfoldersByParentId = async (req, res) => {
  const { parentId } = req.params;
  try {
    const subfolders = await Folder.findAll({
      where: { parentId, userId: req.user.id },
    });
    res.status(200).json(subfolders);
  } catch (error) {
    console.error('Error fetching subfolders:', error);
    res.status(500).json({ error: 'Failed to fetch subfolders' });
  }
};

module.exports = { createFolderApi, createSubFolderApi, getFoldersApi, getSubfoldersByParentId, renameFolder};


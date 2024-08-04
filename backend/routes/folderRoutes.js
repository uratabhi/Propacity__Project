const express = require("express");
const router = express.Router();
const folderControl = require("../controllers/folderControl");
const authenticate = require("../middlewares/auth");

router.post("/folders", authenticate, folderControl.createFolderApi);
router.get("/", authenticate, folderControl.getFoldersApi);
router.post("/subfolders", authenticate, folderControl.createSubFolderApi);
router.put('/folder/:id',   authenticate,  folderControl.renameFolder);


module.exports = router;

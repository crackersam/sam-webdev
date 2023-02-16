const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthenticationMiddleware");
const storage = require("../utils/initStorage");
const multer = require("multer");
const {
  uploadFile,
  getMyFilenames,
  downloadFile,
} = require("../controllers/AssetsController");

const upload = multer({
  storage,
  // max size of 10MB
  limits: { fileSize: 10000000 },
});

// @route POST api/assets
// @desc Uploads file to DB
// @access Private
router.post("/", auth, upload.single("file"), uploadFile);

// @route GET api/assets
// @desc Gets all filenames of user's files
// @access Private
router.get("/", auth, getMyFilenames);

// @route GET api/assets/:filename
// @desc Downloads file
// @access Private
router.get("/:filename", downloadFile);

module.exports = router;

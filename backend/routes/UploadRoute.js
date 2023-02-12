const express = require("express");
const router = express.Router();
const { gfs } = require("../config/db");
const auth = require("../middleware/AuthenticationMiddleware");
const storage = require("../utils/initGfs");
const multer = require("multer");

const upload = multer({
  storage,
  // max size of 10MB
  limits: { fileSize: 10000000 },
});

// @route POST /uploads
// @desc Uploads file to DB
// @access Private
router.post("/", auth, upload.single("file"), (req, res) => {
  console.log("file uploaded successfully", req.file);
  return res.send("File uploaded successfully");
});

module.exports = router;

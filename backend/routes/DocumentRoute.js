const express = require("express");
const router = express.Router();
const protect = require("../middleware/AuthenticationMiddleware");
const {
  saveDocument,
} = require("../controllers/DocumentController");

// @route   POST api/documents
// @desc    Save a document
// @access  Private
router.post("/", protect, saveDocument);

module.exports = router;

const express = require("express");
const router = express.Router();
const protect = require("../middleware/AuthenticationMiddleware");
const {
  saveDocument,
  getMyDocuments,
  getDocument,
  updateDocument,
} = require("../controllers/DocumentController");

// @route   POST api/documents
// @desc    Save a document
// @access  Private
router.post("/", protect, saveDocument);

// @route   GET api/documents/my-documents
// @desc    Get all documents for a user
// @access  Private
router.get("/my-documents", protect, getMyDocuments);

// @route   GET api/documents/:slug
// @desc    Get a document by slug
// @access  Private
router.get("/:slug", protect, getDocument);

router.put("/:slug", protect, updateDocument);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthenticationMiddleware");
const {
  getListOfUsersAndAssets,
  downloadFile,
} = require("../controllers/AdminController");

// @route GET api/admin/assets
// @desc Gets all assets
// @access Private
router.get("/assets", auth, getListOfUsersAndAssets);

// @route GET api/admin/assets/:filename
// @desc Downloads file
// @access Private
router.get("/assets/:filename", auth, downloadFile);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthenticationMiddleware");
const {
  getListOfUsersAndAssets,
  downloadFile,
  updateAvailability,
  getAvailability,
} = require("../controllers/AdminController");

// @route GET api/admin/assets
// @desc Gets all assets
// @access Private
router.get("/assets", auth, getListOfUsersAndAssets);

// @route GET api/admin/assets/:filename
// @desc Downloads file
// @access Private
router.get("/assets/:filename", auth, downloadFile);

// @route PUT api/admin/availability
// @desc Updates availability
// @access Private
router.put("/availability", auth, updateAvailability);

// @route GET api/admin/availability
// @desc Gets availability
// @access Private
router.get("/availability", getAvailability);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthenticationMiddleware");
const { getListOfUsersAndAssets } = require("../controllers/AdminController");

// @route GET api/admin/assets
// @desc Gets all assets
// @access Private
router.get("/assets", auth, getListOfUsersAndAssets);

module.exports = router;

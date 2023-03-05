const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthenticationMiddleware");
const {
  allowedToCall,
} = require("../controllers/CallController");

// @route GET api/calls/allowed-to-call
// @desc Check if user is allowed to call
// @access Private
router.get("/allowed-to-call", auth, allowedToCall);

module.exports = router;

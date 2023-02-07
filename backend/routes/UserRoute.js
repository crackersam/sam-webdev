const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getMe,
} = require("../controllers/UserController");
const protect = require("../middleware/AuthenticationMiddleware");

// register route
router.post("/", createUser);
// login route
router.post("/login", loginUser);
// get current user profile route
router.get("/me", protect, getMe);

module.exports = router;

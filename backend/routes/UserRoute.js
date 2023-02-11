const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/UserController");
const protect = require("../middleware/AuthenticationMiddleware");

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.get("/logout", protect, logoutUser);

module.exports = router;

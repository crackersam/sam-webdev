const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getMe,
  logoutUser,
  resetPassword,
  setNewPassword,
  verifyEmail,
} = require("../controllers/UserController");
const protect = require("../middleware/AuthenticationMiddleware");

router.post("/", createUser);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/login", loginUser);

// send email to user with reset token
router.post("/reset-password", resetPassword);

// verify token and reset password
router.post("/reset-password/:resetToken", setNewPassword);

router.get("/me", protect, getMe);

router.get("/logout", protect, logoutUser);

module.exports = router;

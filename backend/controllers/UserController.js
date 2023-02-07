const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  await user.save();

  const token = await user.generateAuthToken();
  res.status(201).json({
    user,
    token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  const token = await user.generateAuthToken();
  res.status(200).json({ user, token });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ user });
});

module.exports = {
  createUser,
  loginUser,
  getMe,
};

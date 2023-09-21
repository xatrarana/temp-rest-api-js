const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  token: {
    type: String,
    required: false,
    unique: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

const getAllUsers = () => User.find();
const createUser = async (values) =>
  await new User(values).save().then((user) => user.toObject());
exports.getUserById = async (id) => await User.findById(id);
const getUserByEmail = (email) => User.findOne({ email });
const getUserBySessionToken = async (sessionToken) =>
  await User.findOne({
    "authentication.sessionToken": sessionToken,
  });

exports.deleteUserById = async (id) => await User.findByIdAndDelete(id);
exports.updateUserById = async (id, values) =>
  await User.findByIdAndUpdate(values)
    .save()
    .then((user) => user.toObject());

module.exports = {
  User,
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserBySessionToken,
};

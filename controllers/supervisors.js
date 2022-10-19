const User = require("../models/user");
const Verification = require("../models/verification");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinaryConfig");

/**
 * @desc    Add new user
 * @route   POST /addcompany
 * @access  Private
 */
exports.addUser = async (req, res, next) => {
  const { name, email, password, address, role } = req.body;
  const user = req.user;
  const result = await cloudinary.uploader.upload(req.file.path);
  const photo = result.secure_url;
  const hashedPassword = await bcrypt.hash(password, 8);
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    console.log("email taken");
    return res.render("newuser", {
      title: "Create New User",
      message: "Email already in use",
    });
  }
  User.create({
    name,
    email,
    password: hashedPassword,
    address,
    role,
    photo,
  });
  res.render("newuser", {
    title: "Create New User",
    user,
    message: "Account Created",
  });
};

/**
 * @desc    Edit User
 * @route   POST /edituser
 * @access  Private
 */

exports.editUser = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const photo = result.secure_url;
  const user = req.user;
  const id = req.user._id;
  const { name, email, address } = req.body;

  const edituser = await User.findByIdAndUpdate(id, {
    name,
    email,
    address,
    photo,
  });

  if (!edituser)
    return next(new Error(`User not found with id #${req.params.id}`, 404));

  res.render("edituser", {
    title: "Edit User",
    user,
    edituser,
    message: "Account Updated Successfully",
  });
};

/**
 * @desc    Loads all users page
 * @route   GET /users
 * @access  Public
 */
exports.users = async (req, res, next) => {
  const user = req.user,
    allUsers = User.find({});

  res.render("users", {
    title: "All Users",
    user,
    allUsers,
  });
};
/**
 * @desc    Loads all supervisors page
 * @route   GET /supervisors
 * @access  Public
 */
exports.supervisors = async (req, res, next) => {
  const user = JSON.parse(JSON.stringify(req.user)),
    supervisors = User.find({ supervisors });

  res.render("supervisors", {
    title: "All Supervisors",
    user,
    supervisors,
  });
};

/**
 * @desc    Delete user
 * @route   DELETE /deleteuser
 * @access  Private
 */
exports.deleteUser = async (req, res, next) => {
  const deleteuser = await User.findByIdAndDelete(req.params.id);
  const user = req.user;

  if (!deleteuser)
    return next(
      new ErrorResponse(`User not found with id #${req.params.id}`, 404)
    );

  res.render("deleteuser", {
    title: "Delete User",
    user,
    deleteuser,
  });
};

/**
 * @desc    Pending acceptance letter
 * @route   DELETE /verification
 * @access  Private
 */
exports.pendingVerification = async (req, res) => {
  const user = req.user;
  const awaiting = Verification.find("Pending");

  res.render("pendingverification", {
    title: "Pending Acceptance letters",
    user,
    awaiting,
  });
};

/**
 * @desc    Approved acceptance letter
 * @route   DELETE /verification
 * @access  Private
 */
exports.verified = async (req, res) => {
  const user = req.user;
  const Successful = Verification.find("Successful");

  res.render("verified", {
    title: "Approved Acceptance letters",
    user,
    Successful,
  });
};

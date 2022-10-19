const Company = require("../models/company");
const User = require("../models/user");
const Verification = require("../models/verification");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("../config/cloudinaryConfig");

/**
 * @desc    Loads home page
 * @route   GET /
 * @access  Public
 */
exports.home = async (req, res, next) => {
  const user = req.user;
  const company = await Company.find({});

  res.render("home", {
    title: "Home",
    user,
    company,
  });
};

/**
 * @desc    Loads individual company page
 * @route   GET /
 * @access  Public
 */
exports.getCompany = async (req, res, next) => {
  const company = await Company.findOne({slug : req.params.slug});

  if (!company)
    return next(
      new ErrorResponse(`Company not found with id #${req.params.slug}`, 404)
    );

  const user = req.user;
  res.render("company", {
    title: company.companyName,
    user,
    company,
  });
};

/**
 * @desc    Loads all companies page
 * @route   GET /
 * @access  Public
 */
exports.getCompanies = async (req, res, next) => {
  const user = req.user;
  const company = await Company.find({});

  res.render("companies", {
    title: "All Companies",
    user,
    company,
  });
};

/**
 * @desc    Loads employees page
 * @route   GET /
 * @access  Public
 */
exports.employees = async (req, res, next) => {
  const user = req.user;
  const company = await Company.find({});

  res.render("employees", {
    title: "All Employees",
    user,
    company,
  });
};
/**
 * @desc    Loads students page
 * @route   GET /
 * @access  Public
 */
exports.students = async (req, res, next) => {
  const user = req.user;
  const students = await User.find({ role: "student" });

  res.render("student", {
    title: "All Students",
    user,
    students,
  });
};

/**
 * @desc    Loads individual profile page
 * @route   GET /profile/:name
 * @access  Public
 */
 exports.profile = async (req, res, next) => {
  const profile = await User.findOne({name : req.params.name});

  if (!profile)
    return next(
      new ErrorResponse(`User not found with id #${req.params.name}`, 404)
    );

  const user = req.user;
  res.render("individualprofile", {
    title: profile.name,
    user,
    profile,
  });
};

/**
 * @desc    Upload acceptanceLetter
 * @route   Post & Get /acceptanceLetter
 * @access  Private
 */
exports.acceptanceLetter = async (req, res, next) => {
  const user = req.user;
  const workers = user.name;
  const result = await cloudinary.uploader.upload(req.file.path);
  const acceptance = result.secure_url;

  const { companyName, description } = req.body;
  Verification.create({
    workers,
    companyDescrption: description,
    companyName,
    Letter: acceptance,
  });

  res.render("acceptanceLetter", {
    title: "Acceptance Letter",
    user,
    message: "Data Updated",
  });
};

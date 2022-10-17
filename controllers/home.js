const Company = require("../models/company");
const Verification = require("../models/verification");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
const multer = require("multer");

/**
 * @desc    Loads home page
 * @route   GET /
 * @access  Public
 */
exports.home = async (req, res, next) => {
  const user = req.user,
    company = Company.find({}).limit(10);

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
  const company = await Company.findById(req.params.id);

  if (!food)
    return next(
      new ErrorResponse(`Company not found with id #${req.params.id}`, 404)
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
  const user = req.user,
    company = Company.find({});

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
  const company = Company.find({});

  res.render("employees", {
    title: "All Employees",
    user,
    company,
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
  const acceptance = req.file.filename;
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

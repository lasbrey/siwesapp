const Company = require("../models/company");

/**
 * @desc    Add new company
 * @route   POST /addcompany
 * @access  Private
 */
exports.addCompany = async (req, res, next) => {
  const company = await Company.create(req.body);
  const user = req.user;

  res.render("addcompany", {
    title: "New Company",
    user,
    company,
  });
};

/**
 * @desc    Update company
 * @route   POST /updatecompany
 * @access  Private
 */
exports.updateCompany = async (req, res, next) => {
  const user = req.user;

  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!company)
    return next(
      new ErrorResponse(`Company not found with id #${req.params.id}`, 404)
    );

  res.render("updatecompany", {
    title: "Update Company",
    user,
    company,
  });
};

/**
 * @desc    Delete Company
 * @route   DELETE /deletecompany
 * @access  Private
 */
exports.deleteCompany = async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id);
  const user = req.user;

  if (!company)
    return next(
      new ErrorResponse(`Company not found with id #${req.params.id}`, 404)
    );

  res.render("deletecompany", {
    title: "Delete Company",
    user,
    company,
  });
};

/**
 * @desc    Intenship reuest
 * @route   posts /request
 * @access  Private
 */
exports.request = async (req, res, next) => {
  const company = await Company.find(req.params.id);
  const requests = company.requests;

  if (!requests) {
    res.render("requests", { message: "No intenship requests" });
  } else {
    res.render("requests", {
      title: "Intenship Request",
      user,
      requests,
    });
  }
};

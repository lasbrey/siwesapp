const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * @desc    Loads login page
 * @route   GET && POST /login
 * @access  Public
 */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please provide an email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).render("login", {
        message: "Email or Password is incorrect"
      });
    } else {
      const id = user.id;

      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      res.cookie("jwt", token).redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc    Loads register page
 * @route   GET && POST /register
 * @access  Public
 */
exports.register = async (req, res, next) => {

  const { name, email, password } = req.body;
  if (password && password.length < 6) {
    res.send({ message: "Password is less than six characters!" });
    console.log("error 1");
  }

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    // res.send({ message: "Email address has been taken :(" });
    return res.render("register", {
      title: "Register",
      message: "Email already in use"
    });
  } else {
    let hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({name, email, password:hashedPassword });
    res.status(200).redirect("/login");
  }
};

/**
 * @desc    Update user details
 * @route   Post & Get /updateDetails
 * @access  Private
 */
exports.updateDetails = async (req, res, next) => {
  if (req.method === "POST") {
    const { name, email } = req.body;
    const fieldsToUpdate = { name, email };

    const user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.render("updatedetails", {
      title: "Update Details",
      user,
    });
  } else {
    const user = req.user;

    res.render("updatedetails", {
      title: "Update Details",
      user,
    });
  }
};

/**
 * @desc    Logs user out and clears user token
 * @route   GET /logout
 * @access  Public
 */
 exports.logout = async(req, res) => {
  res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true
  });
  res.status(200).redirect('/login');
}



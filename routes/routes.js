const router = require("express").Router();
const {
  register,
  login,
  updateDetails,
  logout,
} = require("../controllers/auth.js");
const {
  isAuthenticated,
  authorize,
  currentUser,
} = require("../middleware/authHelpers");
const {
  home,
  getCompany,
  getCompanies,
  employees,
  acceptanceLetter,
} = require("../controllers/home");
const {
  request,
  addCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company");
const {
  editUser,
  addUser,
  users,
  deleteUser,
  supervisors,
  verified,
  pendingVerification,
} = require("../controllers/supervisors");
const upload = require("../middleware/multer")
/**
 * @desc    Authentication Pages
 * @access  Public
 */
router
  .get("/register", (req, res) => {
    res.render("register", {
      title: "Sign Up",
    });
  })
  .get("/login", login)
  .post("/register", register)
  .post("/login", login)
  .get("/logout", logout)

  /**
   * @desc    All roles accessible routes
   * @access  Public
   */
  .get("/", isAuthenticated, home)
  .get("/profile", isAuthenticated, (req, res) =>{
    res.render ("profile", {
      title: 'Profile',
      user: req.user
    })
  })
  .get("/companies/:slug", isAuthenticated, getCompany)
  .post("/companies/:slug", isAuthenticated, getCompany)
  .get("/companies", isAuthenticated, getCompanies)
  .get("/updatedetails", isAuthenticated, updateDetails)
  .post("/updatedetails", isAuthenticated, updateDetails)
  .get("/acceptanceletter", isAuthenticated, (req, res) => {
    res.render("acceptanceLetter", {
      title: "Acceptance Letter",
      user:req.user
    });
  })
  .post("/acceptanceletter", isAuthenticated, upload.single('acceptance'), acceptanceLetter)
  .get("/company/:employees", isAuthenticated, employees)


  /**
   * @desc    Company routes
   * @access  Public
   */
  .get("/request", isAuthenticated, (req, res) => {
    res.render("requests", {
      title: "Intenship Request",
    });
  })
  .post("/request", isAuthenticated, request, authorize("company"))
  .get("/addcompany", isAuthenticated,authorize("company", "admin"), (req, res) => {
    res.render("addcompany", {
      title: "Add Company",
      user: req.user
    });
  })
  .post(
    "/addcompany",
    isAuthenticated,
    addCompany,
    authorize("company", "admin")
  )
  .delete(
    "/deletecompany",
    isAuthenticated,
    deleteCompany,
    authorize("company", "admin")
  )
  .post(
    "/updatecompany",
    isAuthenticated,
    updateCompany,
    authorize("company", "admin")
  )
  .get(
    "/supervisors",
    isAuthenticated,
    supervisors,
    authorize("admin", "supervisor", "company")
  )
  /**
   * @desc    Supervisor routes
   * @access  Public
   */
   .get("/edituser", isAuthenticated, authorize("supervisor", "admin"), (req, res) => {
    res.render("edituser", {
      title: "Add User",
      user: req.user
    });
  })
  .post(
    "/edituser",
    isAuthenticated,
    upload.single('profilepicture'),
    editUser,
    authorize("supervisor", "admin")
  )
  .post("/adduser", isAuthenticated, upload.single('profilepicture'), authorize("supervisor", "admin"), addUser)
  .get("/adduser", isAuthenticated, authorize("supervisor", "admin"), (req, res) => {
    res.render("newuser", {
      title: "New User",
      user: req.user
    });
  })
  .get("/users", isAuthenticated, users, authorize("admin", "supervisor"))
  .post("/deleteuser", isAuthenticated, deleteUser, authorize("admin"))
  .get("/verified", isAuthenticated, authorize("supervisor", "admin"), (req, res) => {
    res.render("verified", {
      title: "Approved Acceptance Letter",
    });
  })
  .post(
    "/verified",
    isAuthenticated,
    verified,
    authorize("supervisor", "admin")
  )
  .get("/pending", isAuthenticated, authorize("supervisor", "admin"), (req, res) => {
    res.render("pendingverification", {
      title: "Pending Verification",
    });
  })
  .post(
    "/pending",
    isAuthenticated,
    pendingVerification,
    authorize("supervisor", "admin")
  );

module.exports = router;

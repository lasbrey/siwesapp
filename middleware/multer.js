const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (reg, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + req.user.name + '_' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const mimes = ["image/png", "image/jpeg", "image/jpg"];
  if (mimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`wrong file type $(file.mimetype}`));
    cb(null, false);
  }
};

exports.upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});

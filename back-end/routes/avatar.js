const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const authMiddleware = require("../helpers/authMiddleware");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

router.post("/", [upload.single("avatar"), authMiddleware], (req, res) => {
  let path =
    req.protocol +
    "://" +
    req.hostname +
    ":" +
    5000 +
    "/uploads/" +
    req.file.filename;
  User.findById(req.userId).then((user) => {
    user.avatar = path;
    user
      .save()
      .then(() => res.status(200).send(user.avatar))
      .catch((err) => {
        console.log(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
  });
});

module.exports = router;

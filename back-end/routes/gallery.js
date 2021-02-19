const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Image = require("../models/Image");
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

//Add a new image
router.post("/", [upload.array("gallery", 10), authMiddleware], (req, res) => {
  let allImgs = [];
  req.files.forEach((el) => {
    el.path =
      req.protocol +
      "://" +
      req.hostname +
      ":" +
      5000 +
      "/uploads/" +
      el.filename;

    let newImage = new Image({ imageName: el.path, owner: req.userId });
    newImage.save();

    User.findById(req.userId).then((user) => {
      user.images.push(newImage.id),
        user
          .save()
          .then(() => res.status(200))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
    allImgs.push(newImage);
  });
  try {
    res.status(200).send(allImgs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

//Get user's images
router.get("/:id", (req, res) => {
  Image.find({ owner: req.params.id })
    .then((images) => res.send(images))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//Delete an image
router.delete("/:id", authMiddleware, (req, res) => {
  Image.findById({ _id: req.params.id })
    .then((image) => {
      if (req.userId == image.owner) {
        User.findById({ _id: req.userId }).then((user) => {
          let arr = user.images;
          user.images = [];
          (user.images = arr.filter((el) => el != image.id)),
            user
              .save()
              .then(() => res.status(200))
              .catch((err) => {
                console.log(err.message);
                res.status(500).send({ msg: "Server Error" });
              });
        });
        Image.findByIdAndDelete({ _id: req.params.id }).then(() => {
          res.status(200).send(req.params.id);
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send({ msg: "Server Error" });
    });
});

module.exports = router;

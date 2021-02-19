const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
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

//Add new offer
router.post("/", [upload.single("image"), authMiddleware], (req, res) => {
  let path =
    "https://froxx.co.uk/wp-content/uploads/2021/01/Special-offer-3.png";

  if (req.file) {
    path =
      req.protocol +
      "://" +
      req.hostname +
      ":" +
      5000 +
      "/uploads/" +
      req.file.filename;
  }

  let myBody = JSON.parse(req.body.offer);
  let newOffer = new Offer({
    ...myBody,
    image: path,
    owner: req.userId,
  });

  newOffer
    .save()
    .then((offer) => {
      res.status(201).send(offer);
      User.findById(req.userId).then((user) => {
        user.offers.push(offer.id),
          user
            .save()
            .then(() => res.status(200))
            .catch((err) => {
              console.log(err.message);
              res.status(500).send({ msg: "Server Error" });
            });
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//Get user's offers
router.get("/:id", (req, res) => {
  Offer.find({ owner: req.params.id })
    .then((offers) => res.send(offers))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//Delete an offer (id de l'offer)
router.delete("/:id", authMiddleware, (req, res) => {
  Offer.findById({ _id: req.params.id })
    .then((offer) => {
      if (req.userId == offer.owner) {
        User.findById({ _id: req.userId }).then((user) => {
          let arr = user.offers;
          user.offers = [];
          (user.offers = arr.filter((el) => el != offer.id)),
            user
              .save()
              .then(() => res.status(200))
              .catch((err) => {
                console.log(err.message);
                res.status(500).send({ msg: "Server Error" });
              });
        });
        Offer.findByIdAndDelete({ _id: req.params.id }).then(() => {
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

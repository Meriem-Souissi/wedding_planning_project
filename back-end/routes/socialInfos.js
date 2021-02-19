const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Add a User's facebook
router.post(
  "/facebook",
  [[body("facebook", "Invalid website url").isURL()], authMiddleware],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    User.findById(req.userId).then((user) => {
      (user.facebook = req.body.facebook),
        user
          .save()
          .then(() => res.status(200).json(user.facebook))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
  }
);

//Add a User's twitter
router.post(
  "/twitter",
  [[body("twitter", "Invalid website url").isURL()], authMiddleware],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    User.findById(req.userId).then((user) => {
      (user.twitter = req.body.twitter),
        user
          .save()
          .then(() => res.status(200).json(user.twitter))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
  }
);

//Add a User's instagram
router.post(
  "/instagram",
  [[body("instagram", "Invalid website url").isURL()], authMiddleware],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    User.findById(req.userId).then((user) => {
      (user.instagram = req.body.instagram),
        user
          .save()
          .then(() => res.status(200).json(user.instagram))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
  }
);

//Add a User's youtube
router.post(
  "/youtube",
  [[body("youtube", "Invalid website url").isURL()], authMiddleware],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    User.findById(req.userId).then((user) => {
      (user.youtube = req.body.youtube),
        user
          .save()
          .then(() => res.status(200).json(user.youtube))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
  }
);

module.exports = router;

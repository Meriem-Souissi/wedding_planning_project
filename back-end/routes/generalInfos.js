const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

//update a User's fullName
router.post(
  "/name",
  [body("name", "Name error").matches(/^[a-z ]+$/i), authMiddleware],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findById(req.userId).then((user) => {
      (user.name = req.body.name),
        user
          .save()
          .then(() => res.status(200).json(user.name))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
  }
);

//Add a User's adress
router.post(
  "/address",
  [[body("address", "Address error").notEmpty()], authMiddleware],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findById(req.userId).then((user) => {
      (user.address = req.body.address),
        user
          .save()
          .then(() => res.status(200).json(user.address))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
  }
);
//Add a User's proNumber
router.post(
  "/proNumber",
  [
    [
      body("proNumber", "ProNumber error")
        .notEmpty()
        .isNumeric()
        .isLength({ min: 8, max: 8 }),
    ],
    authMiddleware,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findById(req.userId).then((user) => {
      (user.proNumber = req.body.proNumber),
        user
          .save()
          .then(() => res.status(200).json(user.proNumber))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
  }
);

module.exports = router;

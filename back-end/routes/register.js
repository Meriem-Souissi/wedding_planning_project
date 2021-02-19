const express = require("express");
const router = express.Router();
const { body, validationResult, oneOf } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post(
  "/",
  [
    body("name", "Name error")
      .notEmpty()
      .matches(/^[a-z ]+$/i),
    body("gender", "Gender error").notEmpty(),
    body("category", "Category error").notEmpty(),
    oneOf(
      [
        body("category").equals("customer"),
        [body("speciality", "Speciality error").notEmpty()],
      ],
      "Speciality error"
    ),
    body("phone", "Phone error").isNumeric().isLength({ min: 8, max: 8 }),
    body("password", "Password error").isLength({ min: 8 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.find({ phone: req.body.phone }).then((user) => {
      if (user.length) {
        return res
          .status(400)
          .send({ errors: [{ msg: "User already exists!" }] });
      }
      let newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
          if (err) {
            throw err;
          }
          newUser.password = hashedPwd;
          newUser.save();
          let payload = {
            userId: newUser._id,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        });
      });
    });
  }
);

module.exports = router;

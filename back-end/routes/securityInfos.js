const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

//update a User's phone
router.post(
  "/phone",
  [
    [body("phone", "Phone error").isNumeric().isLength({ min: 8, max: 8 })],
    authMiddleware,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    User.findById(req.userId).then((user) => {
      (user.phone = req.body.phone),
        user
          .save()
          .then(() => res.status(200).json(user.phone))
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
          });
    });
  }
);

// Update password
router.post(
  "/password",
  [body("newPassword", "Password error").isLength({ min: 8 }), authMiddleware],
  (req, res) => {
    User.findById(req.userId).then((user) => {
      //comparaison des mots de passe
      bcrypt.compare(req.body.actualPassword, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res.status(401).send({ errors: [{ msg: "Wrong password" }] });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          return res.status(400).json({ errors: errors.array() });
        } else if (req.body.newPassword !== req.body.confirmPassword) {
          return res
            .status(401)
            .send({ errors: [{ msg: "Passwords don't match" }] });
        }
        //crypter le nouveau mot de passe
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          }
          bcrypt.hash(req.body.newPassword, salt, (err, hashedPassword) => {
            if (err) {
              throw err;
            }
            user.password = hashedPassword;
            user
              .save()
              .then(() => res.status(200).json("passeword is updated!"))
              .catch((err) => {
                console.log(err.message);
                res.status(500).send({ msg: "Server Error" });
              });
          });
        });
      });
    });
  }
);

// // Update login number
// router.put("/loginNumber", authMiddleware, (req, res) => {
//   User.findById(req.userId).then((user) => {
//     (user.phone = req.body.loginNumber),
//       user
//         .save()
//         .then(() => res.status(200).json(user.phone))
//         .catch((err) => {
//           console.log(err.message);
//           res.status(500).send({ msg: "Server Error" });
//         });
//   });
// });

module.exports = router;

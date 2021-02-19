const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const User = require("../models/User");

//Add new testimonial
router.post("/", authMiddleware, (req, res) => {
  let newTestimonial = new Testimonial({
    ...req.body,
    feedback: req.body.feedback,
    rate: req.body.rate,
    owner: req.userId,
  });

  newTestimonial
    .save()
    .then((testimonial) => {
      res.status(201).send("testimonial uploaded!");
      User.findById(req.userId).then((user) => {
        user.testimonials.push(testimonial.id),
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

//Get  All testimonials
router.get("/", (req, res) => {
  Testimonial.find()
    .sort({ rate: -1 })
    .limit(3)
    .populate("owner", { name: 1, avatar: 1 })
    .then((testimonials) => {
      let feed = testimonials.filter((el) => el.rate > 3);
      res.status(201).send(feed);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

module.exports = router;

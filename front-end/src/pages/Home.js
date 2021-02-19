import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import OurGoal from "../component/OurGoal";
import ContactUs from "../component/ContactUs";
import Testimonials from "../component/Testimonials";
import bg from "../res/bg.jpg";
import Footer from "../component/Footer";
import FeedComponent from "../component/FeedComponent";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { getTestimonials } from "../actions/testimonialActions";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const TestimonialReducer = useSelector((state) => state.TestimonialReducer);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getTestimonials());
  }, []);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={AnimationOne}
      transition={Transition}
    >
      <div id="home">
        <div className="container">
          <img src={bg} alt="" />
          <div className="menu">
            <h1>Wedding</h1>
            <h3>Planning</h3>
            <h2>Captaring Moments Creating Memories</h2>
          </div>
          <div className="custom-shape-divider-bottom-1603902298">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
        <OurGoal />

        {TestimonialReducer.testimonials.length > 1 && (
          <Testimonials arr={TestimonialReducer.testimonials} />
        )}

        <ContactUs setOpen={setOpen} />

        {auth.user.category === "customer" && (
          <FeedComponent setOpen={setOpen} />
        )}

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={1500}
          onClose={(event, reason) => handleClose(event, reason)}
        >
          <MuiAlert elevation={6} variant="filled" severity="success">
            Message successfully sent
          </MuiAlert>
        </Snackbar>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Home;

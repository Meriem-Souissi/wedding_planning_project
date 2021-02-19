import React from "react";
import "../styles/WrongPage.css";
import { ButtonBase } from "@material-ui/core";
import { HashLink as Link } from "react-router-hash-link";
import notFound from "../res/404.png";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";

const WrongPage = () => {
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={AnimationOne}
      transition={Transition}
    >
      <div className="wrongPage">
        <div className="wrongPage__left">
          <h1>Whooops!</h1>
          <p>Sorry, the page you are looking for doesn't exist</p>
          <ButtonBase>
            <Link to="/">Go back home</Link>
          </ButtonBase>
        </div>
        <div className="wrongPage__right">
          <img src={notFound} alt="" />
        </div>
      </div>
    </motion.div>
  );
};

export default WrongPage;

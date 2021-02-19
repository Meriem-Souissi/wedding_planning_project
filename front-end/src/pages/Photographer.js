import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../component/Card";
import Footer from "../component/Footer";
import { getPhotographer } from "../actions/cardsActions";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";

const Photographer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhotographer());
  }, []);
  const CardsReducer = useSelector((state) => state.CardsReducer);

  return (
    <>
      {CardsReducer.photographer.length !== 0 && (
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={AnimationOne}
          transition={Transition}
        >
          <div className="card__body">
            <div className="card_container">
              {CardsReducer.photographer.map((el, i) => (
                <Card key={i} card={el} />
              ))}
            </div>
          </div>
          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default Photographer;

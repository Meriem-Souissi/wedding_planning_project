import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../component/Card";
import Footer from "../component/Footer";
import { getWeddingVenue } from "../actions/cardsActions";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";

const WeddingVenue = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWeddingVenue());
  }, [dispatch]);
  const CardsReducer = useSelector((state) => state.CardsReducer);

  return (
    <>
      {CardsReducer.wedding_venue.length !== 0 && (
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={AnimationOne}
          transition={Transition}
        >
          <div className="card__body">
            <div className="card_container">
              {CardsReducer.wedding_venue.map((el, i) => (
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

export default WeddingVenue;

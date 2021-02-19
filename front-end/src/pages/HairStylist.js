import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Card from "../component/Card";
import Footer from "../component/Footer";
import { getHairStylist } from "../actions/cardsActions";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";

const HairStylist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHairStylist());
  }, []);
  const CardsReducer = useSelector((state) => state.CardsReducer);

  return (
    <>
      {CardsReducer.hair_stylist.length !== 0 && (
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={AnimationOne}
          transition={Transition}
        >
          <div className="card__body">
            <div className="card_container">
              {CardsReducer.hair_stylist.map((el, i) => (
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

export default HairStylist;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../component/Card";
import Footer from "../component/Footer";
import { getWeddingInvitations } from "../actions/cardsActions";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";

const Invitations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWeddingInvitations());
  }, []);
  const CardsReducer = useSelector((state) => state.CardsReducer);

  return (
    <>
      {CardsReducer.wedding_invitations.length !== 0 && (
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={AnimationOne}
          transition={Transition}
        >
          <div className="card__body">
            <div className="card_container">
              {CardsReducer.wedding_invitations.map((el, i) => (
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

export default Invitations;

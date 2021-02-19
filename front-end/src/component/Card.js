import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import Rating from "@material-ui/lab/Rating";
import "../styles/Card.css";
import { ButtonBase } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addRating } from "../actions/cardsActions";

const Card = ({ card }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="box">
        <div className="card_content">
          <div className="rating">
            <Rating
              name={card._id}
              readOnly={
                auth.isAuth && auth.user._id !== card._id ? false : true
              }
              precision={0.5}
              value={card.rating}
              onChange={(event, newValue) => {
                dispatch(addRating(card._id, newValue));
              }}
            />
          </div>
          <div className="card_avatar">
            <img src={card.avatar} alt="" />
            <h2 title={card.name} className="card_name">
              {card.name}
            </h2>
            <Link to={`/profile/${card._id}`}>
              <ButtonBase className="card_button">See Profile</ButtonBase>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

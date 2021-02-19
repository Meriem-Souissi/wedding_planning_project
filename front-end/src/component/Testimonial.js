import React from "react";

const Testimonial = ({ avatar, content, avatarName }) => {
  return (
    <div className="testimonial-content">
      <img className="testimonial_avatar" src={avatar} alt="" />
      <p>{content}</p>
      <h5>{avatarName}</h5>
    </div>
  );
};

export default Testimonial;

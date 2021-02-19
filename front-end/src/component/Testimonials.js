import React from "react";
import Testimonial from "./Testimonial";

const Testimonials = ({ arr }) => {
  return (
    <div className="testimonials">
      <h1>Testimonials</h1>
      <p>
        We are eternally grateful to those clients who have been good enough to
        recommend us to friends, family and colleagues
      </p>
      <div className="testimonial">
        {arr.map((el, i) => (
          <Testimonial
            key={i}
            avatar={el.owner.avatar}
            content={el.feedback}
            avatarName={el.owner.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

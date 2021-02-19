import React, { useState } from "react";
import { Box, ButtonBase } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { addTestimonial } from "../actions/testimonialActions";

const FeedComponent = ({ setOpen }) => {
  const [feed, setFeed] = useState({ feedback: "", rate: 1 });
  const [hover, setHover] = React.useState(-1);

  const dispatch = useDispatch();

  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };

  const handleFeedback = (e) => {
    setFeed({ ...feed, [e.target.name]: e.target.value });
  };

  return (
    <div className="feed">
      <div className="feedback">
        <div className="feedback__title">
          <h4>Testimonial</h4>
        </div>
        <div className="feedbackContainer">
          <div className="feedbackContainer__top">
            <textarea
              name="feedback"
              cols="20"
              rows="7"
              value={feed.feedback}
              placeholder="We are interested in your opinion..."
              onChange={handleFeedback}
            ></textarea>
          </div>
          <div className="feedbackContainer__rate">
            <Rating
              name="rate"
              value={feed.rate}
              precision={1}
              onChange={(event, newValue) => {
                setFeed({ ...feed, rate: newValue });
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {feed.rate !== null && (
              <Box ml={2}>{labels[hover !== -1 ? hover : feed.rate]}</Box>
            )}
          </div>

          <div className="feedbackContainer__bottom">
            <ButtonBase
              disabled={feed.feedback ? false : true}
              onClick={() => {
                dispatch(addTestimonial(feed, setOpen));
                setFeed({ feedback: "", rate: 1 });
              }}
            >
              Send
            </ButtonBase>
            <ButtonBase onClick={() => setFeed({ feedback: "", rate: 1 })}>
              Cancel
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedComponent;

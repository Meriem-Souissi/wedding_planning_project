import {
  LOAD_TESTIMONIAL_FAIL,
  LOAD_TESTIMONIAL_SUCCESS,
  TESTIMONIAL_FAIL,
  TESTIMONIAL_SUCCESS,
} from "./types";
import axios from "axios";

export const addTestimonial = (feed, setOpen) => (dispatch) => {
  axios
    .post("/testimonial", feed)
    .then((res) => {
      dispatch({
        type: TESTIMONIAL_SUCCESS,
        payload: res.data,
      });
      setOpen(true);
    })
    .catch((err) =>
      dispatch({
        type: TESTIMONIAL_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const getTestimonials = () => (dispatch) => {
  axios
    .get("/testimonial")
    .then((res) =>
      dispatch({
        type: LOAD_TESTIMONIAL_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_TESTIMONIAL_FAIL,
        payload: err.response.data.errors,
      })
    );
};

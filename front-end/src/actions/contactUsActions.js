import { CONTACT_SUCCESS, CONTACT_FAIL } from "./types";
import axios from "axios";

//Contact Us
export const contactUsAction = (info, setOpen) => (dispatch) => {
  axios
    .post("/contact", info)
    .then((res) => {
      dispatch({
        type: CONTACT_SUCCESS,
        payload: res.data,
      });
      setOpen(true);
    })
    .catch((err) =>
      dispatch({
        type: CONTACT_FAIL,
        payload: err.response.data.errors,
      })
    );
};

import { GET_PROFILE_FAIL, GET_PROFILE_SUCCESS } from "./types";
import axios from "axios";

export const getProfile = (id) => (dispatch) => {
  axios
    .get("/profile/" + id)
    .then((res) => {
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILE_FAIL,
        payload: err.response.data.errors,
      })
    );
};

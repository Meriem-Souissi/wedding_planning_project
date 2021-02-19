import {
  OFFER_SUCCESS,
  OFFER_FAIL,
  LOAD_OFFER_FAIL,
  LOAD_OFFER_SUCCESS,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
} from "./types";

import axios from "axios";

// ADD OFFER
export const addOffer = (offer, file) => (dispatch) => {
  console.log(offer);
  let formData = new FormData();
  formData.append("image", file);
  formData.append("offer", JSON.stringify(offer));
  axios
    .post("/offer", formData)
    .then((res) =>
      dispatch({
        type: OFFER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: OFFER_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//Get user's offers
export const getUserOffer = (id) => (dispatch) => {
  axios
    .get("/offer/" + id)
    .then((res) => {
      dispatch({
        type: LOAD_OFFER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: LOAD_OFFER_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//Dlete user's offer
export const deleteOffer = (id) => (dispatch) => {
  axios
    .delete("/offer/" + id)
    .then((res) => {
      dispatch({
        type: DELETE_OFFER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: DELETE_OFFER_FAIL,
        payload: err.response.data.errors,
      })
    );
};

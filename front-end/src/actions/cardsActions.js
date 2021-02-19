import {
  WEDDING_INVITATION_FAIL,
  WEDDING_INVITATION_SUCCESS,
  WEDDING_VENUE_FAIL,
  WEDDING_VENUE_SUCCESS,
  HAIR_STYLIST_SUCCESS,
  HAIR_STYLIST_FAIL,
  PHOTOGRAPHER_SUCCESS,
  PHOTOGRAPHER_FAIL,
  RATING_SUCCESS,
  RATING_FAIL,
} from "./types";

import axios from "axios";

//Get wedding invitations
export const getWeddingInvitations = () => (dispatch) => {
  axios
    .get("/services/wedding_invitations")
    .then((res) =>
      dispatch({
        type: WEDDING_INVITATION_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: WEDDING_INVITATION_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//Get wedding venue
export const getWeddingVenue = () => (dispatch) => {
  axios
    .get("/services/wedding_venue")
    .then((res) =>
      dispatch({
        type: WEDDING_VENUE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: WEDDING_VENUE_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//Get hair stylist
export const getHairStylist = () => (dispatch) => {
  axios
    .get("/services/hair_stylist")
    .then((res) =>
      dispatch({
        type: HAIR_STYLIST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: HAIR_STYLIST_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//Get photographer
export const getPhotographer = () => (dispatch) => {
  axios
    .get("/services/photographers")
    .then((res) =>
      dispatch({
        type: PHOTOGRAPHER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: PHOTOGRAPHER_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//add rating
export const addRating = (id, rate) => (dispatch) => {
  axios
    .post("/rating/" + id, { rate: rate })
    .then((res) => {
      dispatch({
        type: RATING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: RATING_FAIL,
        payload: err.response.data.errors,
      })
    );
};

import {
  FACEBOOK_SUCCESS,
  FACEBOOK_FAIL,
  TWITTER_SUCCESS,
  TWITTER_FAIL,
  INSTAGRAM_SUCCESS,
  INSTAGRAM_FAIL,
  YOUTUBE_SUCCESS,
  YOUTUBE_FAIL,
} from "./types";
import axios from "axios";

export const facebookAction = (
  facebook,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/socialInfos/facebook", { facebook: facebook })
    .then((res) => {
      dispatch({
        type: FACEBOOK_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showFacebook: false });
      setErr([]);
      setUpdates({ ...updates, facebook: "" });
    })
    .catch((err) => {
      dispatch({
        type: FACEBOOK_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};

export const twitterAction = (
  twitter,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/socialInfos/twitter", { twitter: twitter })
    .then((res) => {
      dispatch({
        type: TWITTER_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showTwitter: false });
      setErr([]);
      setUpdates({ ...updates, twitter: "" });
    })
    .catch((err) => {
      dispatch({
        type: TWITTER_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};
export const instagramAction = (
  instagram,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/socialInfos/instagram", { instagram: instagram })
    .then((res) => {
      dispatch({
        type: INSTAGRAM_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showInstagram: false });
      setErr([]);
      setUpdates({ ...updates, instagram: "" });
    })
    .catch((err) => {
      dispatch({
        type: INSTAGRAM_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};
export const youtubeAction = (
  youtube,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/socialInfos/youtube", { youtube: youtube })
    .then((res) => {
      dispatch({
        type: YOUTUBE_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showYoutube: false });
      setErr([]);
      setUpdates({ ...updates, youtube: "" });
    })
    .catch((err) => {
      dispatch({
        type: YOUTUBE_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};

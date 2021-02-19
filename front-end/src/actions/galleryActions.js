import {
  GALLERY_SUCCESS,
  GALLERY_FAIL,
  LOAD_GALLERY_SUCCESS,
  LOAD_GALLERY_FAIL,
  DELETE_GALLERY_SUCCESS,
  DELETE_GALLERY_FAIL,
} from "./types";
import axios from "axios";

export const addGallery = (gallery) => (dispatch) => {
  axios
    .post("/gallery", gallery)
    .then((res) =>
      dispatch({
        type: GALLERY_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GALLERY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//Get user's images
export const getUserGallery = (id) => (dispatch) => {
  axios
    .get("/gallery/" + id)
    .then((res) => {
      dispatch({
        type: LOAD_GALLERY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: LOAD_GALLERY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//Delete user's image
export const deleteGallery = (id) => (dispatch) => {
  axios
    .delete("/gallery/" + id)
    .then((res) => {
      dispatch({
        type: DELETE_GALLERY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: DELETE_GALLERY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

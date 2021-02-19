import {
  COMMENT_FAIL,
  COMMENT_SUCCESS,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_SUCCESS,
  REPLY_FAIL,
  REPLY_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_REPLY_FAIL,
  UPDATE_REPLY_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
} from "./types";
import axios from "axios";

export const postComment = (comment, id) => (dispatch) => {
  //id  profil
  axios
    .post("/comment/" + id, { comment: comment })
    .then((res) => {
      dispatch({
        type: COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: COMMENT_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const postReply = (reply, id) => (dispatch) => {
  axios
    .post("/comment/reply/" + id, { reply: reply }) //id  commentaire mère
    .then((res) => {
      dispatch({
        type: REPLY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: REPLY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const updateComment = (comment, id) => (dispatch) => {
  //id  comment
  axios
    .put("/comment/" + id, { comment: comment })
    .then((res) =>
      dispatch({
        type: UPDATE_COMMENT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_COMMENT_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const deleteComment = (id) => (dispatch) => {
  //id  comment
  console.log(id);
  axios
    .delete("/comment/" + id)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: DELETE_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: DELETE_COMMENT_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const updateReply = (reply, id) => (dispatch) => {
  axios
    .put("/comment/reply/" + id, { reply: reply }) //id  reply
    .then((res) =>
      dispatch({
        type: UPDATE_REPLY_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_REPLY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const deleteReply = (id, commentId) => (dispatch) => {
  console.log(id, commentId);
  axios
    .delete("/comment/reply/" + id, { data: { commentId: commentId } }) //id  reply
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: DELETE_REPLY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: DELETE_REPLY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const getComment = (id) => (dispatch) => {
  axios
    .get("/comment/" + id) //id  profil
    .then((res) => {
      dispatch({
        type: GET_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_COMMENT_FAIL,
        payload: err.response.data.errors,
      })
    );
};

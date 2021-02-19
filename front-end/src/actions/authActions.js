import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOG_OUT,
  REMOVE_AUTH_ERROR,
} from "./types";

import axios from "axios";
import setToken from "../setTokenInHeader";

//Register Action
export const registerUser = (info) => (dispatch) => {
  axios
    .post("/register", info)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors,
      });
    });
};

//Load connected user Action
export const loadUser = () => (dispatch) => {
  setToken();
  axios
    .get("/login")
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err.response.data.errors,
      })
    );
};

//Login
export const SignInUser = (info) => (dispatch) => {
  axios
    .post("/login", info)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const LogOut = () => {
  return {
    type: LOG_OUT,
  };
};

//remove error
export const removeAuthErr = () => {
  return {
    type: REMOVE_AUTH_ERROR,
    payload: [],
  };
};

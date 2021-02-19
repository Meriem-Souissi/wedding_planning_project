import {
  PHONE_SUCCESS,
  PHONE_FAIL,
  PASSWORD_SUCCESS,
  PASSWORD_FAIL,
} from "./types";
import axios from "axios";

export const phoneAction = (
  phone,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/securityInfos/phone", { phone: phone })
    .then((res) => {
      dispatch({
        type: PHONE_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showName: false });
      setErr([]);
      setUpdates({ ...updates, phone: "" });
    })
    .catch((err) => {
      dispatch({
        type: PHONE_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};

export const passwordAction = (
  actualPassword,
  newPassword,
  confirmPassword,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/securityInfos/password", {
      actualPassword: actualPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    })
    .then((res) => {
      dispatch({
        type: PASSWORD_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showPassword: false });
      setErr([]);
      setUpdates({
        ...updates,
        actualPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    })
    .catch((err) => {
      setErr(err.response.data.errors);
      dispatch({
        type: PASSWORD_FAIL,
        payload: err.response.data.errors,
      });
    });
};

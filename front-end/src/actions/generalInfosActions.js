import {
  NAME_SUCCESS,
  NAME_FAIL,
  ADDRESS_SUCCESS,
  ADDRESS_FAIL,
  PRONUMBER_SUCCESS,
  PRONUMBER_FAIL,
} from "./types";
import axios from "axios";

export const nameAction = (
  name,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/generalInfos/name", { name: name })
    .then((res) => {
      dispatch({
        type: NAME_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showName: false });
      setErr([]);
      setUpdates({ ...updates, name: "" });
    })
    .catch((err) => {
      dispatch({
        type: NAME_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};

export const addressAction = (
  address,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/generalInfos/address", { address: address })
    .then((res) => {
      dispatch({
        type: ADDRESS_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showAddress: false });
      setErr([]);
      setUpdates({ ...updates, address: "" });
    })
    .catch((err) => {
      dispatch({
        type: ADDRESS_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};
export const proNumberAction = (
  proNumber,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/generalInfos/proNumber", { proNumber: proNumber })
    .then((res) => {
      dispatch({
        type: PRONUMBER_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showProNumber: false });
      setErr([]);
      setUpdates({ ...updates, proNumber: "" });
    })
    .catch((err) => {
      dispatch({
        type: PRONUMBER_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};

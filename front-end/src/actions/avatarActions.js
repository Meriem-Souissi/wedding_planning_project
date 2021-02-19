import { AVATAR_SUCCESS, AVATAR_FAIL } from "./types";
import axios from "axios";

export const addAvatar = (avatar) => (dispatch) => {
  let formData = new FormData();
  formData.append("avatar", avatar);

  axios
    .post("/avatar", formData)
    .then((res) =>
      dispatch({
        type: AVATAR_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: AVATAR_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};

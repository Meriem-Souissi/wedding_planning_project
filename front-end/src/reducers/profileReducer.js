import {
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  REMOVE,
} from "../actions/types";

const initState = {
  profile: null,
  isprofile: false,
  error: [],
};

const ProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isprofile: true,
        error: [],
      };

    case GET_PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        isprofile: false,
        error: action.payload,
      };

    case REMOVE:
      return {
        profile: null,
        isprofile: false,
        error: [],
      };

    default:
      return state;
  }
};

export default ProfileReducer;

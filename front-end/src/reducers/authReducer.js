import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOG_OUT,
  REMOVE_AUTH_ERROR,
  AVATAR_SUCCESS,
  AVATAR_FAIL,
  NAME_SUCCESS,
  NAME_FAIL,
  ADDRESS_SUCCESS,
  ADDRESS_FAIL,
  PRONUMBER_SUCCESS,
  PRONUMBER_FAIL,
  FACEBOOK_SUCCESS,
  FACEBOOK_FAIL,
  TWITTER_SUCCESS,
  TWITTER_FAIL,
  INSTAGRAM_SUCCESS,
  INSTAGRAM_FAIL,
  YOUTUBE_SUCCESS,
  YOUTUBE_FAIL,
  PHONE_SUCCESS,
  PASSWORD_SUCCESS,
  PASSWORD_FAIL,
  PHONE_FAIL,
} from "../actions/types";

let initState = {
  token: localStorage.getItem("token"),
  user: {
    name: "",
    phone: "",
    category: "",
    speciality: "",
    avatar: "",
    address: "",
    proNumber: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  },
  isAuth: false,
  error: [],
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //Set token in the localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("auth", "true");
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        error: [],
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        error: [],
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
      // Delete token
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      return {
        ...state,
        isAuth: false,
        error: action.payload,
      };

    case LOG_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      return {
        user: {
          name: "",
          phone: "",
          category: "",
          speciality: "",
          avatar: "",
          address: "",
          proNumber: "",
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
        },
        isAuth: false,
        error: [],
      };

    // Update avatar
    case AVATAR_SUCCESS:
      return {
        ...state,
        user: { ...state.user, avatar: action.payload },
        error: [],
      };

    case AVATAR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update name
    case NAME_SUCCESS:
      return {
        ...state,
        user: { ...state.user, name: action.payload },
        error: [],
      };

    case NAME_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update address
    case ADDRESS_SUCCESS:
      return {
        ...state,
        user: { ...state.user, address: action.payload },
        error: [],
      };

    case ADDRESS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update proNumber
    case PRONUMBER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, proNumber: action.payload },
        error: [],
      };

    case PRONUMBER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update facebook
    case FACEBOOK_SUCCESS:
      return {
        ...state,
        user: { ...state.user, facebook: action.payload },
        error: [],
      };

    case FACEBOOK_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update twitter
    case TWITTER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, twitter: action.payload },
        error: [],
      };

    case TWITTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update instagram
    case INSTAGRAM_SUCCESS:
      return {
        ...state,
        user: { ...state.user, instagram: action.payload },
        error: [],
      };

    case INSTAGRAM_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update youtube
    case YOUTUBE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, youtube: action.payload },
        error: [],
      };

    case YOUTUBE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update phone
    case PHONE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, phone: action.payload },
        error: [],
      };

    case PHONE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Update password
    case PASSWORD_SUCCESS:
      return {
        ...state,
        user: { ...state.user, password: action.payload },
        passwordAlert: action.payload,
        error: [],
      };

    case PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case REMOVE_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;

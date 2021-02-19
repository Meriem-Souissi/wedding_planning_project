import { CONTACT_SUCCESS, CONTACT_FAIL } from "../actions/types";

const initState = {
  msg: null,
  send: false,
  error: [],
};

const ContactUsReducer = (state = initState, action) => {
  switch (action.type) {
    case CONTACT_SUCCESS:
      return {
        ...state,
        msg: action.payload,
        send: true,
        error: [],
      };
    case CONTACT_FAIL:
      return {
        ...state,
        msg: null,
        send: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ContactUsReducer;

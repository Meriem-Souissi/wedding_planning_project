import {
  OFFER_SUCCESS,
  OFFER_FAIL,
  LOAD_OFFER_SUCCESS,
  LOAD_OFFER_FAIL,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
  REMOVE,
} from "../actions/types";

let initState = {
  offers: [],
  offerUploaded: false,
  offerDeleted: false,
  error: [],
};

const OfferReducer = (state = initState, action) => {
  switch (action.type) {
    case OFFER_SUCCESS:
      return {
        ...state,
        offers: [...state.offers, action.payload],
        offerUploaded: true,
        error: [],
      };
    case LOAD_OFFER_SUCCESS:
      return {
        ...state,
        offers: action.payload,
        error: [],
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        offers: state.offers.filter((el) => el._id !== action.payload),
        offerDeleted: true,
        error: [],
      };

    case OFFER_FAIL:
    case LOAD_OFFER_FAIL:
      return {
        ...state,
        offerUploaded: false,
        error: action.payload,
      };

    case DELETE_OFFER_FAIL:
      return {
        ...state,
        offerDeleted: false,
        error: action.payload,
      };

    case REMOVE:
      return {
        offers: [],
        offerUploaded: false,
        offerDeleted: false,
        error: [],
      };

    default:
      return state;
  }
};

export default OfferReducer;

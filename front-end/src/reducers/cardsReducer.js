import {
  HAIR_STYLIST_FAIL,
  HAIR_STYLIST_SUCCESS,
  PHOTOGRAPHER_FAIL,
  PHOTOGRAPHER_SUCCESS,
  WEDDING_INVITATION_FAIL,
  WEDDING_INVITATION_SUCCESS,
  WEDDING_VENUE_FAIL,
  WEDDING_VENUE_SUCCESS,
  RATING_SUCCESS,
  RATING_FAIL,
} from "../actions/types";

let initState = {
  wedding_invitations: [],
  wedding_venue: [],
  hair_stylist: [],
  photographer: [],
  error: [],
};

const CardsReducer = (state = initState, action) => {
  switch (action.type) {
    case WEDDING_INVITATION_SUCCESS:
      return {
        ...state,
        wedding_invitations: action.payload,
        error: [],
      };
    case WEDDING_VENUE_SUCCESS:
      return {
        ...state,
        wedding_venue: action.payload,
        error: [],
      };
    case HAIR_STYLIST_SUCCESS:
      return {
        ...state,
        hair_stylist: action.payload,
        error: [],
      };
    case PHOTOGRAPHER_SUCCESS:
      return {
        ...state,
        photographer: action.payload,
        error: [],
      };

    case WEDDING_INVITATION_FAIL:
    case WEDDING_VENUE_FAIL:
    case HAIR_STYLIST_FAIL:
    case PHOTOGRAPHER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case RATING_SUCCESS:
      switch (action.payload.speciality) {
        case "Wedding invitations":
          return {
            ...state,
            wedding_invitations: state.wedding_invitations.map((el) => {
              if (el._id === action.payload._id) {
                return { ...el, rating: action.payload.rating };
              } else {
                return el;
              }
            }),
            error: [],
          };
        case "Wedding venue":
          return {
            ...state,
            wedding_venue: state.wedding_venue.map((el) => {
              if (el._id === action.payload._id) {
                return { ...el, rating: action.payload.rating };
              } else {
                return el;
              }
            }),
            error: [],
          };
        case "Hair stylist":
          return {
            ...state,
            hair_stylist: state.hair_stylist.map((el) => {
              if (el._id === action.payload._id) {
                return { ...el, rating: action.payload.rating };
              } else {
                return el;
              }
            }),
            error: [],
          };
        case "Photographer":
          return {
            ...state,
            photographer: state.photographer.map((el) => {
              if (el._id === action.payload._id) {
                return { ...el, rating: action.payload.rating };
              } else {
                return el;
              }
            }),
            error: [],
          };

        default:
          return state;
      }

    case RATING_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CardsReducer;

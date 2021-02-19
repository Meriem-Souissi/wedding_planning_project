import {
  LOAD_TESTIMONIAL_FAIL,
  LOAD_TESTIMONIAL_SUCCESS,
  TESTIMONIAL_FAIL,
  TESTIMONIAL_SUCCESS,
} from "../actions/types";
let initState = {
  testimonials: [],
  testimonialUploaded: false,
  error: [],
};

const TestimonialReducer = (state = initState, action) => {
  switch (action.type) {
    case TESTIMONIAL_SUCCESS:
      return {
        ...state,
        testimonialUploaded: true,
        error: [],
      };
    case TESTIMONIAL_FAIL:
      return {
        ...state,
        testimonialUploaded: false,
        error: action.payload,
      };
    case LOAD_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        testimonials: action.payload,
        testimonialUploaded: true,
        error: [],
      };
    case LOAD_TESTIMONIAL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default TestimonialReducer;

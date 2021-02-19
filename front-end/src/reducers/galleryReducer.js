import {
  GALLERY_SUCCESS,
  GALLERY_FAIL,
  LOAD_GALLERY_SUCCESS,
  LOAD_GALLERY_FAIL,
  DELETE_GALLERY_SUCCESS,
  DELETE_GALLERY_FAIL,
  REMOVE,
} from "../actions/types";

let initState = {
  images: [],
  galleryUploaded: false,
  error: [],
};

const GalleryReducer = (state = initState, action) => {
  switch (action.type) {
    case GALLERY_SUCCESS:
      return {
        ...state,
        images: [...state.images, ...action.payload],
        galleryUploaded: true,
        error: [],
      };
    case LOAD_GALLERY_SUCCESS:
      return {
        ...state,
        images: action.payload,
        galleryUploaded: true,
        error: [],
      };

    case GALLERY_FAIL:
    case LOAD_GALLERY_FAIL:
    case DELETE_GALLERY_FAIL:
      return {
        ...state,
        galleryUploaded: false,
        error: action.payload,
      };

    case DELETE_GALLERY_SUCCESS:
      return {
        ...state,
        images: state.images.filter((el) => el._id !== action.payload),
        error: [],
      };

    case REMOVE:
      return {
        images: [],
        galleryUploaded: false,
        error: [],
      };

    default:
      return state;
  }
};

export default GalleryReducer;

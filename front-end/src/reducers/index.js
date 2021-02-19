import { combineReducers } from "redux";
import authReducer from "./authReducer";
import GalleryReducer from "./galleryReducer";
import OfferReducer from "./offerReducer";
import TestimonialReducer from "./testimonialReducer";
import ContactUsReducer from "./contactUsReducer";
import CardsReducer from "./cardsReducer";
import ProfileReducer from "./profileReducer";
import CommentReducer from "./commentReducer";

export default combineReducers({
  auth: authReducer,
  GalleryReducer,
  OfferReducer,
  TestimonialReducer,
  ContactUsReducer,
  CardsReducer,
  ProfileReducer,
  CommentReducer,
});

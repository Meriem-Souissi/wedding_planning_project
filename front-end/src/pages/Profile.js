import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { ButtonBase, IconButton, Tooltip, Zoom } from "@material-ui/core";
import Offer from "../component/Offer";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import compareAsc from "date-fns/compareAsc";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ProfileFooter from "../component/ProfileFooter";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addOffer, getUserOffer } from "../actions/offersActions";
import { useParams } from "react-router-dom";
import { getProfile } from "../actions/profileActions";
import Gallery from "../component/Gallery";
import { getUserGallery } from "../actions/galleryActions";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";
import { getComment } from "../actions/commentActions";
import { removeActions } from "../actions/removeActions";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const OfferReducer = useSelector((state) => state.OfferReducer);
  const ProfileReducer = useSelector((state) => state.ProfileReducer);
  const GalleryReducer = useSelector((state) => state.GalleryReducer);
  const CommentReducer = useSelector((state) => state.CommentReducer);
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
      dispatch(getUserOffer(id));
      dispatch(getUserGallery(id));
      dispatch(getComment(id));
    }
    return () => {
      dispatch(removeActions());
    };
  }, [id]);

  const [showOffer, setShowOffer] = useState(false);
  const [imageOffer, setImageOffer] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://froxx.co.uk/wp-content/uploads/2021/01/Special-offer-3.png"
  );

  const [offer, setOffer] = useState({
    offerTitle: "",
    offerSpecification: "",
    offerPrice: "",
    offerExpires: null,
  });

  const offerImageHandler = (e) => {
    const file = e.target.files[0];
    setImageOffer(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOffer = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    if (
      date &&
      date.toString() !== "Invalid Date" &&
      compareAsc(date, new Date()) === 1
    ) {
      setOffer({ ...offer, offerExpires: date });
    }
  };

  return (
    <>
      {ProfileReducer.profile && (
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={AnimationOne}
          transition={Transition}
        >
          <div className="profile">
            <div className="profileHeader">
              <div className="gallery">
                <h2>Gallery</h2>
                <div className="carousel">
                  {GalleryReducer.images.length !== 0 && (
                    <Gallery images={GalleryReducer.images} />
                  )}
                </div>
              </div>
              <div className="flip-box">
                <div className="flip-box-inner">
                  <div className="flip-box-front">
                    <img src={ProfileReducer.profile.avatar} alt="" />
                  </div>
                  <div className="flip-box-back">
                    <div className="flip-box-back-content">
                      <h2>{ProfileReducer.profile.name}</h2>
                      <div className="addressBox">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>{ProfileReducer.profile.address}</p>
                      </div>
                      <p>
                        <i className="fas fa-phone-alt">
                          <span style={{ marginLeft: 10 }}>
                            {ProfileReducer.profile.proNumber}
                          </span>
                        </i>
                      </p>
                      <div className="flip-box-sm">
                        {ProfileReducer.profile.facebook && (
                          <a
                            href={ProfileReducer.profile.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        )}

                        {ProfileReducer.profile.twitter && (
                          <a
                            href={ProfileReducer.profile.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}

                        {ProfileReducer.profile.youtube && (
                          <a
                            href={ProfileReducer.profile.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-youtube"></i>
                          </a>
                        )}

                        {ProfileReducer.profile.instagram && (
                          <a
                            href={ProfileReducer.profile.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profileBody">
              {OfferReducer.offers.length !== 0 &&
                OfferReducer.offers.map((el, i) => (
                  <Offer key={i} offer={el} id={id} />
                ))}

              {auth.user._id === id && (
                <div className="add-offer">
                  <Tooltip TransitionComponent={Zoom} title="Add New Offer">
                    <IconButton onClick={(e) => setShowOffer(true)}>
                      <i className="offer-add-button fas fa-plus-circle"></i>
                    </IconButton>
                  </Tooltip>
                </div>
              )}

              {showOffer && (
                <div className="offer-wrapper">
                  <div
                    className="offer-drop-box"
                    onClick={(e) => {
                      setShowOffer(false);
                      setOffer({
                        offerTitle: "",
                        offerSpecification: "",
                        offerPrice: "",
                        offerExpires: null,
                      });
                      setPreviewImage(
                        "https://froxx.co.uk/wp-content/uploads/2021/01/Special-offer-3.png"
                      );
                      setImageOffer(null);
                    }}
                  />
                  <div className="offer addOffer__animation">
                    <div className="offer-image">
                      <div className="offer-img">
                        <img src={previewImage} alt="" />
                      </div>
                      <div className="offer-img-label">
                        <label htmlFor="offer-image">Choose image</label>
                        <input
                          type="file"
                          id="offer-image"
                          name="image"
                          onChange={offerImageHandler}
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="offer-description">
                      <div className="offer-title">
                        <input
                          type="text"
                          name="offerTitle"
                          onChange={handleOffer}
                          placeholder="Add title"
                          maxLength="25"
                        />
                      </div>
                      <div className="offer-specification">
                        <textarea
                          name="offerSpecification"
                          onChange={handleOffer}
                          cols="30"
                          rows="10"
                          placeholder="Add description"
                          maxLength="300"
                        ></textarea>
                      </div>
                    </div>
                    <div className="offer-bottom">
                      <div className="offer-price">
                        <input
                          type="number"
                          name="offerPrice"
                          onChange={handleOffer}
                          placeholder="Price in DT"
                        />
                      </div>
                      <div className="offer-expires">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            format="dd/MM/yyyy"
                            invalidDateMessage=""
                            variant="inline"
                            value={offer.offerExpires}
                            disablePast={true}
                            minDateMessage=""
                            placeholder="Expires on"
                            onChange={handleDateChange}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="submit-offer">
                      {!offer.offerExpires && (
                        <p className="error_register">
                          *all fields must be filled
                        </p>
                      )}
                      <ButtonBase
                        disabled={
                          offer.offerPrice &&
                          offer.offerSpecification &&
                          offer.offerTitle
                            ? false
                            : true
                        }
                        onClick={() => {
                          dispatch(addOffer(offer, imageOffer));
                          setOffer({
                            offerTitle: "",
                            offerSpecification: "",
                            offerPrice: "",
                            offerExpires: null,
                          });
                          setPreviewImage(
                            "https://froxx.co.uk/wp-content/uploads/2021/01/Special-offer-3.png"
                          );
                          setImageOffer(null);
                          setShowOffer(false);
                        }}
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        onClick={(e) => {
                          setShowOffer(false);
                          setOffer({
                            offerTitle: "",
                            offerSpecification: "",
                            offerPrice: "",
                            offerExpires: null,
                          });
                          setPreviewImage(
                            "https://froxx.co.uk/wp-content/uploads/2021/01/Special-offer-3.png"
                          );
                          setImageOffer(null);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!auth.isAuth && (
              <h4 className="notice">
                Please consider signing so you can comment
              </h4>
            )}

            {(auth.isAuth || CommentReducer.comments.length !== 0) && (
              <ProfileFooter id={id} comments={CommentReducer.comments} />
            )}

            <Footer />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Profile;

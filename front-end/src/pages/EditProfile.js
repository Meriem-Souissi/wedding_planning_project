import React, { useEffect, useRef, useState } from "react";
import "../styles/EditProfile.css";
import { ButtonBase, ClickAwayListener, IconButton } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Footer from "../component/Footer";
import EditGallery from "../component/EditGallery";
import { useSelector, useDispatch } from "react-redux";
import { addAvatar } from "../actions/avatarActions";
import {
  nameAction,
  addressAction,
  proNumberAction,
} from "../actions/generalInfosActions";
import {
  facebookAction,
  instagramAction,
  twitterAction,
  youtubeAction,
} from "../actions/socialInfosActions";
import { passwordAction, phoneAction } from "../actions/securityInfosActions";
import { getUserGallery } from "../actions/galleryActions";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";
import { removeActions } from "../actions/removeActions";

const EditProfile = () => {
  const [showButton, setShowButton] = useState({
    showName: false,
    showAddress: false,
    showProNumber: false,
    showFacebook: false,
    showTwitter: false,
    showInstagram: false,
    showYoutube: false,
    showPhone: false,
    showPassword: false,
    ShowAvatarSubmitButton: false,
    showImagesSubmitButton: false,
  });

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const GalleryReducer = useSelector((state) => state.GalleryReducer);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    if (auth.user.category === "professional") {
      dispatch(getUserGallery(auth.user._id));
    }
    return () => {
      dispatch(removeActions());
    };
  }, [auth.user.category]);

  const [avatar, setAvatar] = useState(null);
  const [updates, setUpdates] = useState({
    name: "",
    address: "",
    proNumber: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    phone: "",
    actualPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState([]);

  const editAvatarPicture = useRef();

  const avatarHandleChange = (e) => {
    setAvatar(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedAvatar(reader.result);
      setShowButton({ ...showButton, ShowAvatarSubmitButton: true });
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={AnimationOne}
      transition={Transition}
    >
      <div className="editProfile">
        <div className="editProfile-image">
          <div className="image_outer_container">
            <div className="import-avatar">
              <IconButton onClick={() => editAvatarPicture.current.click()}>
                <PhotoCameraIcon color="secondary" />
              </IconButton>
              <label ref={editAvatarPicture} htmlFor="impotAvatar"></label>
              <input
                type="file"
                id="impotAvatar"
                onChange={avatarHandleChange}
                accept="image/*"
              />
            </div>
            <div className="image_inner_container">
              <img
                src={selectedAvatar ? selectedAvatar : auth.user.avatar}
                alt=""
              />
            </div>
          </div>
        </div>
        {showButton.ShowAvatarSubmitButton && (
          <div className="submit-information">
            <ButtonBase
              className="save"
              onClick={() => {
                dispatch(addAvatar(avatar));
                setShowButton({ ...showButton, ShowAvatarSubmitButton: false });
              }}
            >
              Save
            </ButtonBase>
            <ButtonBase
              className="cancel"
              onClick={() => {
                setShowButton({ ...showButton, ShowAvatarSubmitButton: false });
                setSelectedAvatar(auth.user.avatar);
              }}
            >
              Cancel
            </ButtonBase>
          </div>
        )}
        <div className="general">
          <h1>General Informations</h1>
          <div className="general-container">
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showName: false });
                setUpdates({ ...updates, name: "" });
                setErr([]);
              }}
            >
              <div className="name info-display">
                <h3 className="item1">Name :</h3>
                <div className="name-container item1">
                  <div className="setting">{auth.user.name}</div>
                  <div
                    className={
                      showButton.showName ? "add-information" : "hidden-info"
                    }
                  >
                    <input
                      type="text"
                      id="name-label"
                      placeholder="Full name"
                      value={updates.name}
                      name="name"
                      onChange={(e) =>
                        setUpdates({ ...updates, name: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "Name error").length !==
                      0 && (
                      <p className="error_signIn">must contain only letters</p>
                    )}

                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            nameAction(
                              updates.name,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({ ...showButton, showName: false });
                          setUpdates({ ...updates, name: "" });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showName: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showAddress: false });
                setUpdates({ ...updates, address: "" });
                setErr([]);
              }}
            >
              <div className="address info-display">
                <h3 className="item1">Address :</h3>
                <div className="address-container item1">
                  <div className="setting">{auth.user.address}</div>
                  <div
                    className={
                      showButton.showAddress ? "add-information" : "hidden-info"
                    }
                  >
                    <input
                      type="text"
                      id="address-label"
                      placeholder="Address"
                      name="address"
                      value={updates.address}
                      onChange={(e) =>
                        setUpdates({ ...updates, address: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "Address error").length !==
                      0 && <p className="error_signIn">required field</p>}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            addressAction(
                              updates.address,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({ ...showButton, showAddress: false });
                          setUpdates({ ...updates, address: "" });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showAddress: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showProNumber: false });
                setUpdates({ ...updates, proNumber: "" });
                setErr([]);
              }}
            >
              <div className="professional-number info-display">
                <h3 className="item1">Professional phone number :</h3>
                <div className="professional-number-container item1">
                  <div className="setting">{auth.user.proNumber}</div>
                  <div
                    className={
                      showButton.showProNumber
                        ? "add-information"
                        : "hidden-info"
                    }
                  >
                    <input
                      type="text"
                      id="professional-number-label"
                      placeholder="Phone number"
                      name="proNumber"
                      value={updates.proNumber}
                      onChange={(e) =>
                        setUpdates({ ...updates, proNumber: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "ProNumber error").length !==
                      0 && (
                      <p className="error_signIn">
                        please enter a valid number
                      </p>
                    )}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            proNumberAction(
                              updates.proNumber,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({
                            ...showButton,
                            showProNumber: false,
                          });
                          setUpdates({ ...updates, proNumber: "" });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showProNumber: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>
          </div>
          <p className="error_register">*the fields above are required</p>
        </div>

        {auth.user.category === "professional" && (
          <div className="social-link">
            <h1>Social Informations</h1>
            <div className="social-link-container">
              <ClickAwayListener
                onClickAway={() => {
                  setShowButton({ ...showButton, showFacebook: false });
                  setUpdates({ ...updates, facebook: "" });
                  setErr([]);
                }}
              >
                <div className="facebook-information info-display">
                  <h3 className="item1">Facebook link :</h3>
                  <div className="facebook-container item1">
                    <div className="setting">{auth.user.facebook}</div>
                    <div
                      className={
                        showButton.showFacebook ? "add-link" : "hidden-info"
                      }
                    >
                      <input
                        type="text"
                        id="facebook-label"
                        placeholder="Facebook link"
                        name="facebook"
                        value={updates.facebook}
                        onChange={(e) =>
                          setUpdates({ ...updates, facebook: e.target.value })
                        }
                      />
                      {err.filter((el) => el.msg === "Invalid website url")
                        .length !== 0 && (
                        <p className="error_signIn">invalid url</p>
                      )}
                      <div className="submit-information">
                        <ButtonBase
                          className="save"
                          onClick={() =>
                            dispatch(
                              facebookAction(
                                updates.facebook,
                                setErr,
                                showButton,
                                setShowButton,
                                updates,
                                setUpdates
                              )
                            )
                          }
                        >
                          Save
                        </ButtonBase>
                        <ButtonBase
                          className="cancel"
                          onClick={() => {
                            setShowButton({
                              ...showButton,
                              showFacebook: false,
                            });
                            setUpdates({ ...updates, facebook: "" });
                            setErr([]);
                          }}
                        >
                          Cancel
                        </ButtonBase>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modify"
                    onClick={() =>
                      setShowButton({ ...showButton, showFacebook: true })
                    }
                  >
                    Modify
                  </div>
                </div>
              </ClickAwayListener>
              <ClickAwayListener
                onClickAway={() => {
                  setShowButton({ ...showButton, showTwitter: false });
                  setUpdates({ ...updates, twitter: "" });
                  setErr([]);
                }}
              >
                <div className="twitter-information info-display">
                  <h3 className="item1">Twitter link :</h3>
                  <div className="twitter-container item1">
                    <div className="setting">{auth.user.twitter}</div>
                    <div
                      className={
                        showButton.showTwitter ? "add-link" : "hidden-info"
                      }
                    >
                      <input
                        type="text"
                        id="twitter-label"
                        placeholder="Twitter link"
                        name="twitter"
                        value={updates.twitter}
                        onChange={(e) =>
                          setUpdates({ ...updates, twitter: e.target.value })
                        }
                      />
                      {err.filter((el) => el.msg === "Invalid website url")
                        .length !== 0 && (
                        <p className="error_signIn">invalid url</p>
                      )}
                      <div className="submit-information">
                        <ButtonBase
                          className="save"
                          onClick={() =>
                            dispatch(
                              twitterAction(
                                updates.twitter,
                                setErr,
                                showButton,
                                setShowButton,
                                updates,
                                setUpdates
                              )
                            )
                          }
                        >
                          Save
                        </ButtonBase>
                        <ButtonBase
                          className="cancel"
                          onClick={() => {
                            setShowButton({
                              ...showButton,
                              showTwitter: false,
                            });
                            setUpdates({ ...updates, twitter: "" });
                            setErr([]);
                          }}
                        >
                          Cancel
                        </ButtonBase>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modify"
                    onClick={() =>
                      setShowButton({ ...showButton, showTwitter: true })
                    }
                  >
                    Modify
                  </div>
                </div>
              </ClickAwayListener>
              <ClickAwayListener
                onClickAway={() => {
                  setShowButton({ ...showButton, showInstagram: false });
                  setUpdates({ ...updates, instagram: "" });
                  setErr([]);
                }}
              >
                <div className="instagram-information info-display">
                  <h3 className="item1">Instagram link :</h3>
                  <div className="instagram-container item1">
                    <div className="setting">{auth.user.instagram}</div>
                    <div
                      className={
                        showButton.showInstagram ? "add-link" : "hidden-info"
                      }
                    >
                      <input
                        type="text"
                        id="instagram-label"
                        placeholder="Instagram link"
                        name="instagram"
                        value={updates.instagram}
                        onChange={(e) =>
                          setUpdates({ ...updates, instagram: e.target.value })
                        }
                      />
                      {err.filter((el) => el.msg === "Invalid website url")
                        .length !== 0 && (
                        <p className="error_signIn">invalid url</p>
                      )}
                      <div className="submit-information">
                        <ButtonBase
                          className="save"
                          onClick={() =>
                            dispatch(
                              instagramAction(
                                updates.instagram,
                                setErr,
                                showButton,
                                setShowButton,
                                updates,
                                setUpdates
                              )
                            )
                          }
                        >
                          Save
                        </ButtonBase>
                        <ButtonBase
                          className="cancel"
                          onClick={() => {
                            setShowButton({
                              ...showButton,
                              showInstagram: false,
                            });
                            setUpdates({ ...updates, instagram: "" });
                            setErr([]);
                          }}
                        >
                          Cancel
                        </ButtonBase>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modify"
                    onClick={() =>
                      setShowButton({ ...showButton, showInstagram: true })
                    }
                  >
                    Modify
                  </div>
                </div>
              </ClickAwayListener>
              <ClickAwayListener
                onClickAway={() => {
                  setShowButton({ ...showButton, showYoutube: false });
                  setUpdates({ ...updates, youtube: "" });
                  setErr([]);
                }}
              >
                <div className="youtube-information info-display">
                  <h3 className="item1">Youtube channel link :</h3>
                  <div className="youtube-container item1">
                    <div className="setting">{auth.user.youtube}</div>
                    <div
                      className={
                        showButton.showYoutube ? "add-link" : "hidden-info"
                      }
                    >
                      <input
                        type="text"
                        id="youtube-label"
                        placeholder="Youtube channel link"
                        name="youtube"
                        value={updates.youtube}
                        onChange={(e) =>
                          setUpdates({ ...updates, youtube: e.target.value })
                        }
                      />
                      {err.filter((el) => el.msg === "Invalid website url")
                        .length !== 0 && (
                        <p className="error_signIn">invalid url</p>
                      )}
                      <div className="submit-information">
                        <ButtonBase
                          className="save"
                          onClick={() =>
                            dispatch(
                              youtubeAction(
                                updates.youtube,
                                setErr,
                                showButton,
                                setShowButton,
                                updates,
                                setUpdates
                              )
                            )
                          }
                        >
                          Save
                        </ButtonBase>
                        <ButtonBase
                          className="cancel"
                          onClick={() => {
                            setShowButton({
                              ...showButton,
                              showYoutube: false,
                            });
                            setUpdates({ ...updates, youtube: "" });
                            setErr([]);
                          }}
                        >
                          Cancel
                        </ButtonBase>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modify"
                    onClick={() =>
                      setShowButton({ ...showButton, showYoutube: true })
                    }
                  >
                    Modify
                  </div>
                </div>
              </ClickAwayListener>
            </div>
          </div>
        )}

        <div className="security">
          <h1>Security Informations</h1>
          <div className="security-container">
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showPhone: false });
                setUpdates({ ...updates, phone: "" });
                setErr([]);
              }}
            >
              <div className="login-number info-display">
                <h3 className="item1">Login number :</h3>
                <div className="login-number-container item1">
                  <div className="setting">{auth.user.phone}</div>
                  <div
                    className={
                      showButton.showPhone ? "add-information" : "hidden-info"
                    }
                  >
                    <input
                      type="text"
                      id="login-number-label"
                      placeholder="Login number"
                      name="loginNumber"
                      value={updates.phone}
                      onChange={(e) =>
                        setUpdates({ ...updates, phone: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "Phone error").length !==
                      0 && (
                      <p className="error_signIn">
                        please enter a valid phone number
                      </p>
                    )}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            phoneAction(
                              updates.phone,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({ ...showButton, showPhone: false });
                          setUpdates({ ...updates, phone: "" });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showPhone: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showPassword: false });
                setUpdates({
                  ...updates,
                  actualPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                setErr([]);
              }}
            >
              <div className="login-password info-display">
                <h3 className="item1">Change password :</h3>
                <div className="login-password-container item1">
                  <div
                    className={
                      showButton.showPassword
                        ? "add-information"
                        : "hidden-info"
                    }
                  >
                    <input
                      type="password"
                      id="actual-password-label"
                      placeholder="Actual password"
                      name="actualPassword"
                      value={updates.actualPassword}
                      onChange={(e) =>
                        setUpdates({
                          ...updates,
                          actualPassword: e.target.value,
                        })
                      }
                    />
                    {err.filter((el) => el.msg === "Wrong password").length !==
                      0 && <p className="error_signIn">Wrong password</p>}
                    <input
                      type="password"
                      id="new-password-label"
                      placeholder="New password"
                      name="newPassword"
                      value={updates.newPassword}
                      onChange={(e) =>
                        setUpdates({ ...updates, newPassword: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "Password error").length !==
                      0 && (
                      <p className="error_signIn">
                        Password must contain at least 8 characters
                      </p>
                    )}
                    <input
                      type="password"
                      id="confirm-password-label"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={updates.confirmPassword}
                      onChange={(e) =>
                        setUpdates({
                          ...updates,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    {err.filter((el) => el.msg === "Passwords don't match")
                      .length !== 0 && (
                      <p className="error_signIn">Passwords don't match</p>
                    )}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            passwordAction(
                              updates.actualPassword,
                              updates.newPassword,
                              updates.confirmPassword,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({ ...showButton, showPassword: false });
                          setUpdates({
                            ...updates,
                            actualPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showPassword: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </div>

        {GalleryReducer.galleryUploaded &&
          auth.user.category === "professional" && (
            <EditGallery
              err={err}
              setErr={setErr}
              img={GalleryReducer.images}
              setShowButton={setShowButton}
              showButton={showButton}
            />
          )}

        <Footer />
      </div>
    </motion.div>
  );
};

export default EditProfile;

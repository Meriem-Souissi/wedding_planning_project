import React, { useState } from "react";
import { ButtonBase, IconButton, Tooltip, Zoom } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { addGallery, deleteGallery } from "../actions/galleryActions";
import { useDispatch } from "react-redux";

const EditGallery = ({ showButton, setShowButton, img, setErr, err }) => {
  const [selectedImages, setSelectedImages] = useState(img);
  const [gallery, setGallery] = useState(new FormData());
  const dispatch = useDispatch();

  const imageHandleChange = (e) => {
    if (e.target.files && e.target.files.length < 11 - selectedImages.length) {
      let formData = new FormData();
      for (let image of gallery.entries()) {
        formData.append("gallery", image[1]);
      }
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("gallery", e.target.files[i]);
      }
      setGallery(formData);
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages(
        selectedImages.concat(
          fileArray.map((el) => {
            return { imageName: el };
          })
        )
      );

      setShowButton({ ...showButton, showImagesSubmitButton: true });
    } else {
      setErr([{ msg: "gallery error" }]);
    }
  };

  const deleteImage = (index) => {
    if (selectedImages[index]._id) {
      dispatch(deleteGallery(selectedImages[index]._id));
      setSelectedImages(
        selectedImages.filter((el) => selectedImages.indexOf(el) !== index)
      );
    } else {
      setSelectedImages(
        selectedImages.filter((el) => selectedImages.indexOf(el) !== index)
      );
    }
  };

  return (
    <div className="edit-gallery">
      <h1>Gallery Image</h1>
      <div className="image-number">
        <p className="error_register">*a minimum of 3 images is required</p>
        <div>{`${selectedImages.length} / 10`}</div>
      </div>
      <div className="img-gallery-container">
        {selectedImages.map((el, i) => (
          <div key={i} className="selected-image-container">
            {!showButton.showImagesSubmitButton && (
              <div className="delete-image">
                <IconButton onClick={() => deleteImage(i)}>
                  <CancelIcon fontSize="large" color="disabled" />
                </IconButton>
              </div>
            )}

            <div className="selected-img">
              <img src={el.imageName} alt="" />
            </div>
          </div>
        ))}
        {selectedImages.length < 10 && (
          <div className="gallery-img">
            <Tooltip TransitionComponent={Zoom} title="Add images">
              <label htmlFor="gallery-img1">
                <i className="fas fa-camera"></i>
              </label>
            </Tooltip>

            <input
              type="file"
              multiple
              id="gallery-img1"
              onChange={imageHandleChange}
            />
          </div>
        )}
      </div>
      {err.filter((el) => el.msg === "gallery error").length !== 0 && (
        <p className="error_signIn">
          {`still left ${10 - selectedImages.length} images to download`}
        </p>
      )}
      {showButton.showImagesSubmitButton && (
        <div className="submit-information">
          <ButtonBase
            className="save"
            onClick={() => {
              setShowButton({
                ...showButton,
                showImagesSubmitButton: false,
              });
              dispatch(addGallery(gallery));
            }}
          >
            Save
          </ButtonBase>
          <ButtonBase
            className="cancel"
            onClick={() => {
              setSelectedImages(img);
              setGallery(new FormData());
              setShowButton({
                ...showButton,
                showImagesSubmitButton: false,
              });
            }}
          >
            Cancel
          </ButtonBase>
        </div>
      )}
    </div>
  );
};

export default EditGallery;

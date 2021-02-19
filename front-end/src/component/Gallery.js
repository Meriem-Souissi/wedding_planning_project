import React, { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";

const Gallery = ({ images }) => {
  const [galleryCarousel, setGalleryCarousel] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: false,
    config: config.slow,
  });

  const slides = images
    .map((el) => {
      return {
        key: el._id,
        content: <img src={el.imageName} alt="" />,
      };
    })
    .map((slide, index) => {
      return {
        ...slide,
        onClick: () =>
          setGalleryCarousel({ ...galleryCarousel, goToSlide: index }),
      };
    });
  return (
    <Carousel
      slides={slides}
      goToSlide={galleryCarousel.goToSlide}
      offsetRadius={galleryCarousel.offsetRadius}
      showNavigation={galleryCarousel.showNavigation}
      animationConfig={galleryCarousel.config}
    />
  );
};

export default Gallery;

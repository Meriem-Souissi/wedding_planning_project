import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import Footer from "../component/Footer";
import weddingInvitationImage from "../res/invitation.png";
import weddingVenueImage from "../res/salle-des-fetes.jpg";
import hairStylistImage from "../res/salon.jpg";
import photographerImage from "../res/shooting.jpg";
import "../styles/Services.css";
import { motion } from "framer-motion";
import { AnimationOne, Transition } from "../animations";

const Services = () => {
  const content = [
    {
      title: "Wedding Invitations",
      image: weddingInvitationImage,
      linkTo: "wedding_invitation",
    },
    {
      title: "Wedding Venue",
      image: weddingVenueImage,
      linkTo: "wedding_venue",
    },
    {
      title: "Hair Stylist",
      image: hairStylistImage,
      linkTo: "hair_stylist",
    },
    {
      title: "Photographer",
      image: photographerImage,
      linkTo: "photographer",
    },
  ];

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={AnimationOne}
      transition={Transition}
    >
      <div className="servicePage">
        {content.map((el, i) => (
          <div key={i} className="service">
            <h2>{el.title}</h2>
            <div className="service__container">
              <div className="service__top">
                <img src={el.image} alt="" />
              </div>
              <div className="service__bottom">
                <h2>
                  <Link to={`/services/${el.linkTo}`}>Meet our team</Link>
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Services;

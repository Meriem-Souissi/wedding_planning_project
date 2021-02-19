import React from "react";

const OurGoal = () => {
  return (
    <div id="goal" className="our_goal">
      <h1>Amazing Events</h1>
      <p>
        Our goal is to make your day special in all its details... <br /> Our
        team is always working to make you happy and fulfill your desires...
        <br /> We wish you a life filled with joy and happiness
      </p>
      <div className="services">
        <div>
          <h4 className="description-title-1">Wedding Invitations</h4>
          <p className="description">
            It's time... <br /> All designs are ready for you
          </p>
        </div>
        <div className="v-line"></div>
        <div className="box box-1">
          <div className="inner-border"></div>
        </div>
      </div>

      <div className="services">
        <div className="box box-2">
          <div className="inner-border"></div>
        </div>
        <div className="v-line"></div>
        <div>
          <h4 className="description-title-2">Wedding Venue</h4>
          <p className="description">
            To those who have come to share their happy times with you... <br />
            Comfort and hospitality is our mission
          </p>
        </div>
      </div>

      <div className="services">
        <div>
          <h4 className="description-title-1">Hair Stylist</h4>
          <p className="description">
            Time has come to shine like a star in the sky
          </p>
        </div>
        <div className="v-line"></div>
        <div className="box box-3">
          <div className="inner-border"></div>
        </div>
      </div>

      <div className="services">
        <div className="box box-4">
          <div className="inner-border"></div>
        </div>
        <div className="v-line"></div>
        <div>
          <h4 className="description-title-2">Photographer</h4>
          <p className="description">
            We never let amazing moments fade from your memory. Our goal is to
            establish them forever
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurGoal;

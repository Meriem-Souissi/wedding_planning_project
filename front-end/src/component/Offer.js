import React from "react";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { deleteOffer } from "../actions/offersActions";

const Offer = ({ offer, id }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="offerComponent">
      {auth.user._id === id && (
        <div className="delete-offerComponent">
          <IconButton onClick={() => dispatch(deleteOffer(offer._id))}>
            <CancelIcon fontSize="large" color="secondary" />
          </IconButton>
        </div>
      )}

      <div className="offerComponent-img">
        <img src={offer.image} alt="" />
      </div>
      <div className="offerComponent-description">
        <div className="offerComponent-title" title={offer.offerTitle}>
          {offer.offerTitle}
        </div>
        <div className="offerComponent-specification">
          {offer.offerSpecification}
        </div>
      </div>
      <div className="offerComponent-bottom">
        <div className="offerComponent-price">
          Price : <span>{offer.offerPrice}</span> DT
        </div>
        {offer.offerExpires && (
          <div className="offerComponent-expires">
            Will expire on :
            <span> {format(new Date(offer.offerExpires), "dd/MM/yyyy")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offer;

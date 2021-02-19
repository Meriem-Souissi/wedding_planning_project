import React, { useEffect, useState } from "react";
import {
  Input,
  InputLabel,
  FormControl,
  TextField,
  ButtonBase,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { contactUsAction } from "../actions/contactUsActions";

const ContactUs = ({ setOpen }) => {
  const ContactUsReducer = useSelector((state) => state.ContactUsReducer);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (ContactUsReducer.error.length === 0) {
      setInfo({
        name: "",
        email: "",
        message: "",
      });
    }
  }, [ContactUsReducer.error]);

  const contactUs = (e) => {
    e.preventDefault();
    dispatch(contactUsAction(info, setOpen));
  };

  return (
    <div id="contact" className="contact_us">
      <form onSubmit={contactUs}>
        <h1>Contact Us</h1>
        <FormControl className="form_field">
          <InputLabel>Your name</InputLabel>
          <Input
            type="text"
            name="name"
            value={info.name}
            onChange={handleChange}
          />
        </FormControl>
        {ContactUsReducer.error.filter((el) => el.msg === "Name error")
          .length !== 0 && (
          <p className="error_signIn">*must contain only letters</p>
        )}
        <FormControl className="form_field">
          <InputLabel>Email adresse</InputLabel>
          <Input
            type="email"
            name="email"
            value={info.email}
            onChange={handleChange}
          />
        </FormControl>
        {ContactUsReducer.error.filter((el) => el.msg === "Email error")
          .length !== 0 && (
          <p className="error_signIn">*please enter a valid email</p>
        )}
        <TextField
          type="text"
          name="message"
          value={info.message}
          onChange={handleChange}
          className="form_field"
          multiline
          rows={6}
          label="Your message"
          variant="outlined"
        />
        {ContactUsReducer.error.filter((el) => el.msg === "Message error")
          .length !== 0 && <p className="error_signIn">*empty field</p>}
        <ButtonBase type="submit">Send</ButtonBase>
      </form>
    </div>
  );
};

export default ContactUs;

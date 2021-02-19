import React, { useEffect, useState } from "react";
import {
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  MenuItem,
  ButtonBase,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, registerUser, removeAuthErr } from "../actions/authActions";
import { withRouter } from "react-router-dom";

const Register = ({ setRegister, history }) => {
  const [info, setInfo] = useState({
    name: "",
    gender: "",
    category: "",
    speciality: "",
    phone: "",
    password: "",
    avatar: "",
  });

  const specialities = [
    "Wedding invitations",
    "Wedding venue",
    "Hair stylist",
    "Photographer",
  ];
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (info.gender === "male") {
      setInfo({
        ...info,
        avatar: "https://img.icons8.com/officel/80/000000/user.png",
      });
    } else {
      if (info.gender === "female") {
        setInfo({
          ...info,
          avatar: "https://img.icons8.com/officel/80/000000/businesswoman.png",
        });
      }
    }
  }, [info.gender]);

  useEffect(() => {
    if (info.category === "customer") {
      setInfo({ ...info, speciality: null });
    }
  }, [info.category]);

  useEffect(() => {
    if (auth.isAuth) {
      setRegister(false);
      dispatch(loadUser());
      history.push("/edit-profile");
    }
  }, [auth.isAuth, dispatch]);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(info));
  };

  return (
    <div className="register-wrapper">
      <div
        className="register-backdrop"
        onClick={(e) => {
          setRegister(false);
          dispatch(removeAuthErr());
        }}
      />
      <div className="register-box">
        <div className="register_card">
          <form onSubmit={handleRegister}>
            <h1>Tell us more about you</h1>
            <FormControl style={{ marginBottom: 20 }}>
              <InputLabel>Your full name</InputLabel>
              <Input
                error={
                  auth.error.filter((el) => el.msg === "Name error").length !==
                  0
                    ? true
                    : false
                }
                type="text"
                name="name"
                onChange={handleChange}
              />
              <p
                className={
                  auth.error.filter((el) => el.msg === "Name error").length !==
                  0
                    ? "error_register errColor"
                    : "error_register"
                }
              >
                *must contain only letters
              </p>
            </FormControl>
            <FormControl className="radio_control" component="fieldset">
              <div className="register_legend">Gender:</div>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            {auth.error.filter((el) => el.msg === "Gender error").length !==
              0 && <p className="error_register errColor">*required field</p>}
            <FormControl className="radio_control" component="fieldset">
              <div className="register_legend">Category:</div>
              <RadioGroup
                row
                aria-label="category"
                name="category"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="customer"
                  control={<Radio size="small" />}
                  label="Customer"
                />
                <FormControlLabel
                  value="professional"
                  control={<Radio size="small" />}
                  label="Professional"
                />
              </RadioGroup>
            </FormControl>
            {auth.error.filter((el) => el.msg === "Category error").length !==
              0 && <p className="error_register errColor">*required field</p>}
            {info.category === "professional" && (
              <>
                <TextField
                  error={
                    auth.error.filter((el) => el.msg === "Speciality error")
                      .length !== 0
                      ? true
                      : false
                  }
                  select
                  label="Speciality"
                  name="speciality"
                  value={info.speciality}
                  onChange={handleChange}
                >
                  {specialities.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                {auth.error.filter((el) => el.msg === "Speciality error")
                  .length !== 0 && (
                  <p className="error_register errColor">*required field</p>
                )}
              </>
            )}
            <FormControl style={{ margin: "5px 0" }}>
              <InputLabel>Phone number</InputLabel>
              <Input
                error={
                  auth.error.filter((el) => el.msg === "Phone error").length !==
                    0 ||
                  auth.error.filter((el) => el.msg === "User already exists!")
                    .length !== 0
                    ? true
                    : false
                }
                type="tel"
                name="phone"
                onChange={handleChange}
              />
              {auth.error.filter((el) => el.msg === "User already exists!")
                .length === 0 && (
                <p
                  className={
                    auth.error.filter((el) => el.msg === "Phone error")
                      .length !== 0
                      ? "error_register errColor"
                      : "error_register"
                  }
                >
                  *please enter a valid phone number
                </p>
              )}
              {auth.error.filter((el) => el.msg === "User already exists!")
                .length !== 0 && (
                <p
                  className={
                    auth.error.filter((el) => el.msg === "User already exists!")
                      .length !== 0
                      ? "error_register errColor"
                      : "error_register"
                  }
                >
                  *user already exists!
                </p>
              )}
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input
                error={
                  auth.error.filter((el) => el.msg === "Password error")
                    .length !== 0
                    ? true
                    : false
                }
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={(e) => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <p
                className={
                  auth.error.filter((el) => el.msg === "Password error")
                    .length !== 0
                    ? "error_register errColor"
                    : "error_register"
                }
              >
                *must contain at least 8 characters
              </p>
            </FormControl>
            <div className="register_button">
              <ButtonBase type="submit">Done !</ButtonBase>
              <ButtonBase
                onClick={(e) => {
                  setRegister(false);
                  dispatch(removeAuthErr());
                }}
              >
                Cancel
              </ButtonBase>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);

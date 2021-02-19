import React, { useEffect, useState } from "react";
import {
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  ButtonBase,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, SignInUser, removeAuthErr } from "../actions/authActions";

const SignIn = ({ setSignIn }) => {
  const [info, setInfo] = useState({
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuth) {
      setSignIn(false);
      dispatch(loadUser());
    }
  }, [auth.isAuth]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(SignInUser(info));
  };

  return (
    <div className={"signIn-wrapper"}>
      <div
        className={"signIn-backdrop"}
        onClick={(e) => {
          setSignIn(false);
          dispatch(removeAuthErr());
        }}
      />
      <div className={"signIn-box"}>
        <div className="signIn_card">
          <form onSubmit={handleSignIn}>
            <h1 className="signIn_title">Happy to see you again</h1>
            <FormControl style={{ margin: "5px 0" }}>
              <InputLabel>Phone number</InputLabel>
              <Input
                error={
                  auth.error.filter((el) => el.msg === "Phone error").length !==
                    0 ||
                  auth.error.filter((el) => el.msg === "Please register before")
                    .length !== 0
                    ? true
                    : false
                }
                type="tel"
                name="phone"
                onChange={handleChange}
              />
              {auth.error.filter((el) => el.msg === "Please register before")
                .length !== 0 && (
                <p className="error_signIn">Account doesn't exist</p>
              )}
              {auth.error.filter((el) => el.msg === "Phone error").length !==
                0 && (
                <p className="error_signIn">
                  Please enter a valid phone number
                </p>
              )}
            </FormControl>
            <FormControl style={{ marginTop: 40 }}>
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
              {auth.error.filter((el) => el.msg === "Password error").length !==
                0 && <p className="error_signIn">Wrong password</p>}
            </FormControl>
            <div className="signIn_button">
              <ButtonBase type="submit">Okay !</ButtonBase>
              <ButtonBase
                onClick={(e) => {
                  setSignIn(false);
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

export default SignIn;

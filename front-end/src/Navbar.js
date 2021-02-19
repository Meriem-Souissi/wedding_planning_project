import React, { useState } from "react";
import {
  Avatar,
  ButtonBase,
  Chip,
  IconButton,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import { HashLink as Link } from "react-router-hash-link";
import Register from "./component/Register";
import SignIn from "./component/SignIn";
import EditIcon from "@material-ui/icons/Edit";
import Logo from "./res/logo.png";
import "./styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "./actions/authActions";

const Navbar = () => {
  const [register, setRegister] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className="navbar">
      <div className="header__left">
        <img src={Logo} alt="" />
      </div>
      <div className="header__middle">
        <ul>
          <li>
            <Link
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              to="/#home"
            >
              <ButtonBase
                style={{
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  padding: "10px 15px",
                  borderRadius: 8,
                }}
              >
                Home
              </ButtonBase>
            </Link>
          </li>
          <li>
            <Link
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              to="/#goal"
            >
              <ButtonBase
                style={{
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  padding: "10px 15px",
                  borderRadius: 8,
                }}
              >
                Our Goal
              </ButtonBase>
            </Link>
          </li>
          <li>
            <Link to="/services">
              <ButtonBase
                style={{
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  padding: "10px 15px",
                  borderRadius: 8,
                }}
              >
                Services
              </ButtonBase>
            </Link>
          </li>
          <li>
            <Link
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              to="/#contact"
            >
              <ButtonBase
                style={{
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  padding: "10px 15px",
                  borderRadius: 8,
                }}
              >
                Contact Us
              </ButtonBase>
            </Link>
          </li>
        </ul>
      </div>
      <div className="header__right">
        {auth.isAuth || localStorage.getItem("token") ? (
          <ul>
            {auth.user.category === "professional" && (
              <li>
                <Link to={`/profile/${auth.user._id}`}>
                  <Chip
                    style={{
                      background: "transparent",
                      color: "white",
                      fontFamily: "inherit",
                      fontSize: "large",
                    }}
                    avatar={
                      <Avatar
                        style={{ width: 30, height: 30 }}
                        src={auth.user.avatar}
                      />
                    }
                    label={auth.user.name.split(" ")[0]}
                    clickable
                    color="primary"
                  />
                </Link>
              </li>
            )}

            <li style={{ margin: 0 }}>
              <Link to="/edit-profile">
                <Tooltip TransitionComponent={Zoom} title="Edit profile">
                  <IconButton>
                    <EditIcon style={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </li>
            <li onClick={() => dispatch(LogOut())}>
              <Link to="/">Log out</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li onClick={(e) => setRegister(true)}>
              <ButtonBase
                style={{
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  padding: "10px 15px",
                  borderRadius: 8,
                }}
              >
                Register
              </ButtonBase>
            </li>
            <li onClick={(e) => setSignIn(true)}>
              <ButtonBase
                style={{
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  padding: "10px 15px",
                  borderRadius: 8,
                }}
              >
                Sign In
              </ButtonBase>
            </li>
          </ul>
        )}
      </div>
      {register && <Register setRegister={setRegister} />}
      {signIn && <SignIn setSignIn={setSignIn} />}
    </div>
  );
};

export default Navbar;

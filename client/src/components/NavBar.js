import React from "react";
import Header from "./Header.js";
import * as Icon from "react-bootstrap-icons";
import LoginHeader from "./LoginHeader.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations.js";
import Auth from "../utils/auth.js";
import Modal from "./modals/AddProjectModal.js";
// import MyStopwatch from './Watch.js'

export default function NavBar() {
  const style = {
    color: "whitesmoke",
    textDecoration: "none",
  };

  const location = useLocation();

  const [login, {loginError}] = useMutation(LOGIN);

  async function demoGo() {
    try {
      const { data } = await login({
        variables: {
          email: "demo@projectx.com",
          password: "password"
        }
      })
      Auth.login(data.login.token);
    } catch (error) {
      alert(loginError + '' + error);
    }
  }

  return (
    <div>
      <LoginHeader />
      <div className="navbar">
        <ul className="nav d-flex flex-column align-items-start w-100">
          <Header />
          <li className="nav-item my-3 d-flex align-items-center">
            <Link to={Auth.loggedIn() ? "/" : "/landing"} style={style}>
              <Icon.Speedometer color="whitesmoke" size={25} className="mx-3" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item my-3 d-flex align-items-center">
            <Link to={Auth.loggedIn() ? "/projects" : "/landing"} style={style}>
              <Icon.Check2Circle
                color="whitesmoke"
                size={25}
                className="mx-3"
              />
              Projects
            </Link>
          </li>
          <li className="nav-item my-3 d-flex align-items-center">
            <Link to={Auth.loggedIn() ? "/me" : "/landing"} style={style}>
              <Icon.PersonCircle
                color="whitesmoke"
                size={25}
                className="mx-3"
              />
              Profile
            </Link>
          </li>
          <li className="nav-item my-3 d-flex align-items-center">
            <Link
              to={Auth.loggedIn() ? "/communication" : "/landing"}
              style={style}
            >
              <Icon.Messenger color="whitesmoke" size={25} className="mx-3" />
              Communication
            </Link>
          </li>
        </ul>
        {location.pathname === "/landing" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/" ? (
          <button type="button" className="demo-btn btn rounded-pill btn-outline-light" onClick={demoGo}>
            Demo Account
          </button>
        ) : (
          <div></div>
        )}
        {/* <div id="watch">
      <MyStopwatch />
      </div> */}
      </div>
    </div>
  );
}

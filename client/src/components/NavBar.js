import React from "react";
import Header from "./Header.js";
import * as Icon from "react-bootstrap-icons";
import LoginHeader from "./LoginHeader.js";
import { Link } from "react-router-dom";
import Auth from "../utils/auth.js"
// import MyStopwatch from './Watch.js'

export default function NavBar() {
  
  const style = {
    color: "whitesmoke",
    textDecoration: "none"
  }

    return (
    <div>
    <LoginHeader />
    <div className="navbar">
      <ul className="nav d-flex flex-column align-items-start w-100">
        <Header />
        <li className="nav-item my-3 d-flex align-items-center">       
          <Link to={Auth.loggedIn()? "/" : "/landing"} style={style}>
          <Icon.Speedometer color="whitesmoke" size={25} className="mx-3"/>
            Dashboard
          </Link>
        </li>
        <li className="nav-item my-3 d-flex align-items-center">       
          <Link to={Auth.loggedIn()? "/projects" : "/landing"} style={style}>
          <Icon.Check2Circle color="whitesmoke" size={25} className="mx-3"/>
            Projects
          </Link>
        </li>
        <li className="nav-item my-3 d-flex align-items-center">       
          <Link to={Auth.loggedIn()? "/me" : "/landing"} style={style}>
          <Icon.PersonCircle color="whitesmoke" size={25} className="mx-3"/>
            Profile
          </Link>
        </li>
        <li className="nav-item my-3 d-flex align-items-center">       
          <Link to={Auth.loggedIn()? "/communication" : "/landing"} style={style}>
          <Icon.Messenger color="whitesmoke" size={25} className="mx-3"/>
            Communication
          </Link>
        </li>
      </ul>
      {/* <div id="watch">
      <MyStopwatch />
      </div> */}
    </div>
    </div>
  );
}

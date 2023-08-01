import React from "react";
import Header from "./Header.js";
import * as Icon from "react-bootstrap-icons";
// import MyStopwatch from './Watch.js'

export default function NavBar() {
  return (
    <div className="navbar">
      <ul className="nav d-flex flex-column align-items-start w-100">
        <Header />
        <li className="nav-item my-3 d-flex align-items-center">
          <Icon.PersonCircle color="whitesmoke" size={25} />
          <a
            className="nav-link active text-light"
            aria-current="page"
            href="#"
          >
            Profile
          </a>
        </li>
        <li className="nav-item my-3 d-flex align-items-center">
          <Icon.CheckCircleFill color="whitesmoke" size={25} />
          <a className="nav-link text-light" href="#">
            Projects
          </a>
        </li>
        <li className="nav-item my-3 d-flex align-items-center">
          <Icon.GraphUp color="whitesmoke" size={25} />
          <a className="nav-link text-light" href="#">
            Performance
          </a>
        </li>
        <li className="nav-item my-3 d-flex align-items-center">
          <Icon.ChatDotsFill color="whitesmoke" size={25} />
          <a className="nav-link text-light" aria-disabled="true">
            Communication
          </a>
        </li>
      </ul>
      {/* <div id="watch">
      <MyStopwatch />
      </div> */}
    </div>
  );
}

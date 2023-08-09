import React from "react";
import logo from '../images/x-logo.png'


export default function Landing() {
  return (
    <div className="container-fluid">
      <div className="Landing row">
          <div className="logo-big">
            <img src={logo} id="logo"></img>
          </div>
        </div>
    </div>
  );
}

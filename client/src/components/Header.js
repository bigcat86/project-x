import React from "react";
import logo from '../images/x-logo.png'

export default function Header() {
  return(
    <div className="d-flex my-5 align-items-center justify-content-center">
        <h1 className="">Project</h1>
        <img src={logo} alt="" className="logo"></img>
    </div>
  )
}

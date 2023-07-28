import React from "react";
import logo from '../logo.svg'

export default function Header() {
  return(
    <div className="d-flex my-5">
        <img src={logo} alt="" className="logo"></img>
        <h1 className="">Project X</h1>
    </div>
  )
}

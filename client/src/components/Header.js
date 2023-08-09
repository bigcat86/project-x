import React from "react";
import logo from '../images/x-logo.png'
import { Link } from "react-router-dom"

export default function Header() {
  
  const style = {
    color: "whitesmoke",
    textDecoration: "none"
  }
  
    return(

        <Link to={"/landing"} className="d-flex my-5 align-items-center justify-content-center" style={style}>
        <h1 className="header">Project</h1>
        <img src={logo} alt="" className="logo"></img>
        </Link>

  )
}

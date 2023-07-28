import React from "react";
import Header from "./Header";

export default function NavBar() {
  return (
    <div>
      <Header />
      <ul className="nav flex-column text-center">
        <li className="nav-item my-5 bg-primary">
          <a className="nav-link active text-light" aria-current="page" href="#projects">
            Projects
          </a>
        </li>
        <li className="nav-item my-5 bg-primary text-light">
          <a className="nav-link text-light" href="#tasks">Tasks</a>
        </li>
        <li className="nav-item my-5 bg-primary text-light">
          <a className="nav-link text-light" href="#teams">Teams</a>
        </li>
        <li className="nav-item my-5 bg-primary text-light">
          <a className="nav-link text-light" href="#communication">Communication</a>
        </li>
      </ul>
    </div>
  );
}

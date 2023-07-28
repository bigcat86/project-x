import React from "react";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="container-fluid text-center">
      <div className="row text-center">
        <div className="col-3">
            <NavBar />
        </div>
        <div className="col-9">One of three columns</div>
      </div>
    </div>
  );
}

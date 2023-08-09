import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

export default function LoginHeader() {
  return (
    <div>
      {Auth.loggedIn() ? (
          <div className="Login container d-flex justify-content-start">
          <Link to={"/logout"}>
            <div className="icon-link text-light" href="#">
              <Icon.BoxArrowInLeft color="whitesmoke" size={25} />
              Logout
            </div>
          </Link>
        </div>
      ) : (
        <div className="Login container d-flex justify-content-start">
          <Link to={"/login"}>
            <div className="icon-link text-light" href="#">
              <Icon.BoxArrowInRight color="whitesmoke" size={25} />
              Login
            </div>
          </Link>

          <Link to={"/signup"}>
            <div className="icon-link text-light" href="#">
              <Icon.PersonLinesFill color="whitesmoke" size={25} />
              Sign-up
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

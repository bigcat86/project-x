import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN, ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth"

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOGIN);
  const [addUser, { userError }] = useMutation(ADD_USER);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleClick(event) {
    event.preventDefault();

    try {
      if (location.pathname === "/login") {
        const { data } = await login({
          variables: {
            email: formState.email,
            password: formState.password,
          }
        });
        Auth.login(data.login.token)
        data.login.token
          ? navigate("/", { replace: true })
          : alert("Try again loser!");
      } else {
        const { data } = await addUser({
          variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password,
          },
        });
        Auth.login(data.addUser.token)
        data.addUser.token
          ? navigate("/", { replace: true })
          : alert("Try again loser!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setFormState({ ...formState, [name]: value });
    } else if (name === "email") {
      setFormState({ ...formState, [name]: value });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" data-bs-theme="dark">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <div className="login-box d-flex flex-column gap-2">
            {location.pathname === "/login" ? <h1>Login</h1> : <h1>Sign-up</h1>}
            {location.pathname === "/signup" ? (
              <div className="input-group input-group-lg">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Username
                </span>
                <input
                  name="username"
                  id="username"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  onChange={handleChange}
                ></input>
              </div>
            ) : (
              <div></div>
            )}
            <div className="input-group input-group-lg">
              <span className="input-group-text" id="inputGroup-sizing-lg">
                Email
              </span>
              <input
                name="email"
                id="email"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-group input-group-lg">
              <span className="input-group-text" id="inputGroup-sizing-lg">
                Password
              </span>
              <input
                name="password"
                id="password"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={handleChange}
              ></input>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

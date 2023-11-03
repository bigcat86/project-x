import React from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  Auth.logout();

  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/landing", { replace: true });
  }, 1000);

  return (
    <div>
      <h1>You are logged out.</h1>
    </div>
  );
}

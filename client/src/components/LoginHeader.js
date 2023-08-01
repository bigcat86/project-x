import React from 'react';

export default function LoginHeader() {
  return (
    <div className="Login container d-flex justify-content-end">
      <a className="icon-link text-light" href="#">
        <i className="bi bi-box-arrow-in-right"></i>
        Login
      </a>
      <a className="icon-link text-light" href="#">
        <i className="bi bi-check-square"></i>
        Sign-up
      </a>
    </div>
  )
}
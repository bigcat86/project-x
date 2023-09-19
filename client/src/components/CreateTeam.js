import React from "react";
import * as Icon from "react-bootstrap-icons";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USERS, QUERY_ME } from "../utils/queries";
import Logo from "../images/x-logo.png";

export default function CreateTeam() {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(QUERY_USERS);
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery(QUERY_ME);

  const users = userData?.users || [];
  const me = meData?.me || [];


  if (userLoading || meLoading) {
    return (<h1>Loading...</h1>)
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4">
          <h1>Available Users</h1>

          <ul className="list-group">
            {users.map((user) => (
              <li className="list-group-item" key={user._id}>
                {user.image ? (
                  <img id="myteam-img" src={user.image} alt={user.username}></img>
                ) : (
                  <img id="myteam-img" src={Logo} alt="logo"></img>
                )}
                {user.username}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h1>My Teams</h1>
          <ul className="list-group">
            {users.map((user) => (
              <li className="list-group-item" key={user._id}>
                {user.image ? (
                  <img id="myteam-img" src={user.image} alt="user.username"></img>
                ) : (
                  <img id="myteam-img" src={Logo} alt="logo"></img>
                )}
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

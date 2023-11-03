import React from "react";
import * as Icon from "react-bootstrap-icons";
import logo from "../images/x-logo.png";
import TeamModal from "./modals/TeamModal";
import CreateTeamModal from "./modals/CreateTeamModal";

export default function UserCard({ users }) {
  if (!users.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="" data-bs-theme="dark">
      
      <h3 className="project-title border border-light rounded bg-primary p-3 d-flex flex-column align-items-start">
        <Icon.PeopleFill color="whitesmoke" size={25} /> Users
        <TeamModal users={users} className="align-self-end"/>
      </h3>

      <ul className="Team list-group mt-2" data-bs-theme="dark">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <li className="list-group-item bg-dark d-flex">
                <img
                  src={user.image ? user.image : logo}
                  alt={""}
                  className="teamImg"
                ></img>
                {user.username}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

import React from "react";
import * as Icon from "react-bootstrap-icons";
import logo from "../images/x-logo.png"


export default function TeamCard({users}) {

    if (!users.length) {
        return <h1>Loading...</h1>
    }

  return (
    <div className="" data-bs-theme="dark">
        
    <h3 className='project-title text-start border border-light rounded bg-primary p-3'><Icon.PeopleFill color="whitesmoke" size={25} /> Team</h3> 
    <ul className="Team list-group mt-2" data-bs-theme="dark">
      {users.map((user) => {
        return (
          <div key={user.id}>
            <li className="list-group-item bg-dark d-flex">
              <img src={user.image ? user.image : logo} alt={""} className="teamImg"></img>
              {user.username}
            </li>
          </div>
        );
      })}
    </ul>
    </div>
  );
}

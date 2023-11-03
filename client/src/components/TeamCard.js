import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_TEAMS } from "../utils/queries";
import logo from "../images/x-logo.png";

export default function TeamCard({teams}) {
 

  return (
    <div className="" data-bs-theme="dark">
      <h3 className="project-title border border-light rounded bg-primary p-3 d-flex flex-column align-items-start">
        {teams.map((team) => {
          return team.teamName;
        })}
      </h3>

      <ul className="Team list-group mt-2" data-bs-theme="dark">
        {teams.map((team) => {
          return team.users.map((mate) => {
            return (
              <div key={mate.id}>
                <li className="list-group-item bg-dark d-flex">
                  <img
                    src={mate.image ? mate.image : logo}
                    alt={""}
                    className="teamImg"
                  ></img>
                  {mate.username}
                </li>
              </div>
            );
          });
        })}
      </ul>
    </div>
  );
}

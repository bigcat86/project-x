import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USERS, QUERY_ME } from "../utils/queries";
import { ADD_USER } from "../utils/mutations";
import Logo from "../images/x-logo.png";

export default function CreateTeam({ users }) {
  const [addUser, { error }] = useMutation(ADD_USER);

  const [formState, setFormState] = useState({
    teamName: "",
    teamLead: "",
    teamMembers: [],
  });

  const [showNext, setShowNext] = useState(false);

  const applyShowNext = () => {
    showNext ? setShowNext(false) : setShowNext(true);
  };

  return (
    <div>
      <button type="button" className="btn btn-light mb-3" onClick={applyShowNext}>
        Create Team
      </button>
      {showNext ? (
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Team Name
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            ></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Team Lead (user)
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            ></input>
          </div>

          <div className="mb-5">
            <h4 className="card-text placeholder-glow">
              Select Your Teammates
              <Icon.ChevronDoubleRight
                color="whitesmoke"
                className="mx-3"
                size={25}
              />
              <span className="placeholder"></span>
            </h4>
            
          </div>

          <em>
            To assign a project for this team, click the projects tab and
            select the project you would like to assign.
          </em>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

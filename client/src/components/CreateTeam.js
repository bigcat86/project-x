import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_TEAMS } from "../utils/queries";
import { CREATE_TEAM } from "../utils/mutations";
import TeamCard from "./TeamCard";

export default function CreateTeam({ users, teammates, setTeammates }) {
  const [createTeam, { teamError }] = useMutation(CREATE_TEAM);
  const { data: teamData, loading: teamLoading } = useQuery(QUERY_TEAMS);

  const teams = teamData?.teams || [];

  const [formState, setFormState] = useState({
    teamName: "",
    teamLead: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const [showNext, setShowNext] = useState(false);

  const applyShowNext = () => {
    showNext ? setShowNext(false) : setShowNext(true);
  };

  const removeFromTeam = (user) => {
    const newTeammates = teammates.filter((teammate) => teammate !== user);
    setTeammates(newTeammates);
  };

  async function handleCreateTeam(event) {
    event.preventDefault();

    try {
      const teamLeadId = users.filter(
        (user) => user.username === formState.teamLead
      )[0]._id;
      const { data } = await createTeam({
        variables: {
          teamName: formState.teamName,
          teamLead: teamLeadId,
          users: [teammates],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-light mb-3"
        onClick={applyShowNext}
      >
        Create Team
      </button>
      {showNext ? (
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Team Name
            </span>
            <input
              name="teamName"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleChange}
            ></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Team Lead (user)
            </span>
            <input
              name="teamLead"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleChange}
            ></input>
          </div>

          <div className="mb-5">
            <div>
              {teammates.length > 0 ? (
                teammates.map((user) => {
                  return (
                    <div className="d-flex" key={user.username}>
                      <img
                        src={user.image}
                        alt="logo"
                        className="rounded-circle"
                        width="50"
                        height="50"
                      />
                      <p className="mx-3">{user.username}</p>
                      <Icon.XCircleFill
                        color="whitesmoke"
                        className="mx-3"
                        size={25}
                        onClick={() => removeFromTeam(user)}
                      />
                    </div>
                  );
                })
              ) : (
                <h4 className="card-text placeholder-glow">
                  Select Your Teammates
                  <Icon.ChevronDoubleRight
                    color="whitesmoke"
                    className="mx-3"
                    size={25}
                  />
                  <span className="placeholder"></span>
                </h4>
              )}
            </div>
          </div>

          <em>
            To assign a project for this team, click the projects tab and select
            the project you would like to assign.
          </em>
          <br></br>
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleCreateTeam}
          >
            Add Team
          </button>
        </div>
      ) : (
        <div>
          {teams.length > 0 ? (
            <div>
              <h4>All the teams</h4>
            </div>
          ) : (
            <div>
              <h4>No Teams Yet</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

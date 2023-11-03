import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_USERS } from "../../utils/queries";
import UserCard from "../UserCard";
import logo from "../../images/x-logo.png";
import * as Icon from "react-bootstrap-icons";
import CreateTeam from "../CreateTeam";

export default function TeamModal({ users }) {

  const [teammates, setTeammates] = useState([]);

  const addToTeam = (user) => {
    setTeammates([...teammates, user]);
  }


  return (
    <div>
      <button
        type="button"
        class="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target="#team"
      >
        Manage Team
      </button>

      <div
        class="modal fade"
        id="team"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Manage Teams
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                data-bs-target="#team"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col-6">
                  <p>My Teams</p>
                  <CreateTeam users={users} teammates={teammates} setTeammates={setTeammates}/>
                </div>
                <div className="col-6">
                  <p>Available Users</p>
                  {users.map((user) => {
                    return (
                      <div className="d-flex">
                        <img
                          src={user.image ? user.image : logo}
                          alt={""}
                          className="teamImg"
                          id="user-img"
                        ></img>
                        <p>{user.username}</p>
                        <div className="add-user">
                          <Icon.PersonAdd
                            color="whitesmoke"
                            className="mx-3"
                            size={25}
                            onClick={() => addToTeam(user)}
                            
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

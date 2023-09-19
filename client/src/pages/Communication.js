import React from "react";
import Kanban from "../components/Kanban";
import CreateTeam from "../components/CreateTeam";

export default function Communication() {
  return (
    <div className="container-fluid">
      <div className="row">
            <h1>Communication</h1>
        </div>
        <div className="row">
          <Kanban/>
        </div>
        <div>
          {/* <CreateTeam /> */}
        </div>
    </div>
  );
}
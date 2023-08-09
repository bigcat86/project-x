import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TASK } from "../utils/mutations";
import { QUERY_TASKS, QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
import TaskCard from "../components/TaskCard";

export default function SingleProject() {
  const { loading, data, error } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];
  const { projectId } = useParams();

  if (loading) {
    return <div>Loading...</div>;
  }else {
    const thisProject = projects.filter((project) => project._id === projectId);
    console.log(thisProject[0]);
    return (
      <div>
        <h1>Project Data</h1>
        <ul class="list-group mt-3" data-bs-theme="dark">
          <li class="list-group-item">{thisProject[0]._id}</li>
          <li class="list-group-item">{thisProject[0].projectName}</li>
          <li class="list-group-item">{thisProject[0].description}</li>
          <li class="list-group-item">
            Completion: {thisProject[0].completion}%
          </li>
          <li class="list-group-item">
            {thisProject[0].tasks ? (
              thisProject[0].tasks.map((task) => {
                return <li>{task.taskName}</li>;
              })
            ) : (
              <li>Tasks Not Yet Assigned</li>
            )}
          </li>
        </ul>
        <TaskCard />
      </div>
    );
}
}

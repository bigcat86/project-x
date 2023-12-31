import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TASK, REMOVE_TASK } from "../utils/mutations";
import { QUERY_TASKS, QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
import * as Icon from "react-bootstrap-icons";
import AddProjectModal from "../components/modals/AddProjectModal"

export default function SingleProject() {
  const {
    data: taskData,
    loading: taskLoading,
    error: taskError,
  } = useQuery(QUERY_TASKS);
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery(QUERY_PROJECTS);

  const projects = projectData?.projects || [];
  const tasks = taskData?.tasks || [];
  const { projectId } = useParams();

  const [removeTask, { error }] = useMutation(REMOVE_TASK);

  async function handleTrash(event) {
    event.preventDefault();
    try {
      console.log(event.target.id);
      const { data } = await removeTask({
        variables: {
          taskId: event.target.id,
          projectId: projectId,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  if (projectLoading || taskLoading) {
    return <div>Loading...</div>;
  } else {
    const thisProject = projects.filter((project) => project._id === projectId);
    const thisTask = tasks.filter((task) => task.projectId === projectId);
    return (
      <div>
        <h1>Project Data</h1>
        <ul className="list-group mt-3" data-bs-theme="dark">
          {/* <li className="list-group-item">{thisProject[0]._id}</li> */}
          <li className="list-group-item">{thisProject[0].projectName}</li>
          <li className="list-group-item">{thisProject[0].description}</li>
          <li className="list-group-item">
            Completion: {thisProject[0].completion}%
          </li>
          <li className="list-group-item d-flex justify-content-between">Tasks:<AddProjectModal /></li>
          <li className="list-group-item">
            {thisTask.length ? 
              thisTask.map((task) => {
                return (
                  <li className="list-group-item d-flex justify-content-between">
                    <div key={task._id}>{task.taskName}</div>
                    <div>
                      <Icon.Trash3Fill
                        id={task._id}
                        color="whitesmoke"
                        size={25}
                        onClick={handleTrash}
                      ></Icon.Trash3Fill>
                    </div>
                  </li>
                );
              })
             : 
             <li className="list-group-item">Tasks Not Yet Assigned</li>  
            }
          </li>
        </ul>
      </div>
    );
  }
}

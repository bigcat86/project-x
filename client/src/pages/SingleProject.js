import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK,
  UPDATE_PROJECT_COMPLETION,
} from "../utils/mutations";
import { QUERY_TASKS, QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
import * as Icon from "react-bootstrap-icons";
import AddProjectModal from "../components/modals/AddProjectModal";
import Confetti from "react-confetti";


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
  const [completeTask, { errorComplete }] = useMutation(COMPLETE_TASK,
    {
      refetchQueries: [
        {
          query: QUERY_TASKS,
        },
        {
          query: QUERY_PROJECTS,
        }
      ],
    });
  const [updateProjectCompletion, { errorUpdate }] = useMutation(UPDATE_PROJECT_COMPLETION,
    {
      refetchQueries: [
        {
          query: QUERY_PROJECTS,
        },
      ],
    } 
  );

  const [showConfetti, setShowConfetti] = useState(false);

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
      // window.location.reload();
      updateCompletion();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleComplete(event) {
    // event.preventDefault();
    try {
      const { data } = await completeTask({
        variables: {
          taskId: event.target.id,
        },
      });
      window.location.reload();
      updateCompletion();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateCompletion() {
    console.log("updateCompletion");
    try {
      let countCompleted = 0;
      tasks.forEach((task) => {
        if (task.completed === true) {
          countCompleted++;
        }
      });
      const { data } = await updateProjectCompletion({
        variables: {
          projectId: projectId,
          newCompletion: (countCompleted / tasks.length) * 100,
        },
      });
      if ((countCompleted / tasks.length) * 100 === 100) {
        setShowConfetti(!showConfetti);
      }
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
      <div style={{ position: "relative" , height: "100vh", width: "70vw" }}>
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
        <h1>Project Data</h1>
        <ul className="list-group mt-3" data-bs-theme="dark">
          <li
            className="list-group-item"
            style={{ color: thisProject[0].completed ? "green" : "whitesmoke" }}
          >
            {thisProject[0].projectName}
          </li>
          <li className="list-group-item">{thisProject[0].description}</li>
          <li className="list-group-item">
            Completion: {thisProject[0].completion}%
          </li>
          <li className="list-group-item d-flex justify-content-between">
            Tasks: ({thisProject[0].tasks.length})
            <AddProjectModal />
          </li>
          <li className="list-group-item">
            {thisTask.length ? (
              thisTask.map((task) => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    key={task._id}
                    id={task._id}
                  >
                    <div
                      style={{
                        color: task.completed === true ? "green" : "whitesmoke",
                      }}
                    >
                      {task.taskName}
                      <Icon.Check2Circle
                        style={{
                          display: task.completed === true ? "inline" : "none",
                        }}
                        size={25}
                      ></Icon.Check2Circle>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary mx-3"
                        id={task._id}
                        onClick={async function (event) {
                          event.preventDefault();
                          // setShowConfetti(!showConfetti);
                          handleComplete(event);
                        }}
                      >
                        Complete Task
                      </button>
                      <Icon.Trash3Fill
                        id={task._id}
                        color="whitesmoke"
                        size={25}
                        onClick={async function (event) {
                          event.preventDefault();
                          handleTrash(event);
                        }}
                      ></Icon.Trash3Fill>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="list-group-item">Tasks Not Yet Assigned</li>
            )}
          </li>
        </ul>
      </div>
    );
  }
}

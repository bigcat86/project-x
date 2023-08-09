import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TASK } from "../utils/mutations";
import { QUERY_TASKS, QUERY_ME } from "../utils/queries";

export default function TaskCard() {
  
  const { data: taskData } = useQuery(QUERY_TASKS);
  const { data: myData } = useQuery(QUERY_ME);

  const [addTask, { error }] = useMutation(ADD_TASK);

  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [formState, setFormState] = useState({
    taskName: "",
    description: ""
  });

  async function handleClick(event) {
    event.preventDefault();

    try {
      const { data } = await addTask({
        variables: {
          taskName: formState.taskName,
          description: formState.description,
          projectId: projectId
        },
      });
      console.log(formState.description)
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "taskName") {
      setFormState({ ...formState, [name]: value });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div className="container-fluid">
      <div className="col-12" data-bs-theme="dark">
        <h1>Add a Task</h1>
        <div className="input-group input-group-lg">
          <span className="input-group-text" id="inputGroup-sizing-lg">
            Task Name
          </span>
          <input
            name="taskName"
            id="taskName"
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-group input-group-lg">
          <span className="input-group-text" id="inputGroup-sizing-lg">
            Description
          </span>
          <input
            name="description"
            id="description"
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            onChange={handleChange}
          ></input>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Add Task
        </button>
      </div>
    </div>
  );
}

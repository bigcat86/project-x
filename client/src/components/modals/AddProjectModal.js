import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_TASK, ADD_PROJECT } from "../../utils/mutations";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { projectId } = useParams();

  const [addTask, { error: taskError }] = useMutation(ADD_TASK);
  const [addProject, { error: projectError }] = useMutation(ADD_PROJECT);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [formState, setFormState] = useState({
    taskName: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "taskName") {
      setFormState({ ...formState, [name]: value });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  async function handleClick(event) {
    event.preventDefault();

    try {
      if (location.pathname === "projects") {
        const { data: projectData } = await addProject({
          variables: {
            projectName: formState.projectName,
            description: formState.description,
          },
        });
      } else {
        const { data: taskData } = await addTask({
          variables: {
            taskName: formState.taskName,
            description: formState.description,
            projectId: projectId,
          },
        });
      }
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="btn btn-light" onClick={openModal}>
        {location.pathname === "/projects" ? "Add Project" : "Add Task"}
      </button>

      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {location.pathname === "/projects" ? "Add Project" : "Add Task"}
              </h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {location.pathname === "/projects" ? (
                <div className="input-group input-group-lg">
                  <span className="input-group-text" id="inputGroup-sizing-lg">
                    Project Name
                  </span>
                  <input
                    name="projectName"
                    id="projectName"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    onChange={handleChange}
                  ></input>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text">Description</span>
                    <textarea
                      name="description"
                      id="description"
                      type="text"
                      className="form-control"
                      aria-label="With textarea"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="col-12" data-bs-theme="dark">
                  <div className="input-group input-group-lg">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-lg"
                    >
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
                    <div className="input-group input-group-lg">
                      <span className="input-group-text">Description</span>
                      <textarea
                        name="description"
                        id="description"
                        type="text"
                        className="form-control"
                        aria-label="With textarea"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

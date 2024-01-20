import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Tooltip from "react-bootstrap";
import AddProjectModal from "../components/modals/AddProjectModal";


export default function ProjectCard({ projects, profile }) {
  const style = {
    color: "whitesmoke",
    textDecoration: "none",
  };

  const [removeProject, { error }] = useMutation(REMOVE_PROJECT);
  const location = useLocation();
  const navigate = useNavigate();

  async function handleTrash(event) {
    event.preventDefault();
    const projectId = event.target.id;
    try {
      const { data } = await removeProject({
        variables: { projectId: projectId },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const today = new Date().toLocaleDateString();
  console.log(today);
 

  return (
    <div className="list-group w-100" data-bs-theme="dark">
      <div className="project-title text-start border border-light rounded bg-primary p-3 d-flex justify-content-between">
        <h3 className="proj-title">
          <Icon.CheckCircleFill color="whitesmoke" size={25} /> Projects
        </h3>
        {location.pathname === "/projects" ? <AddProjectModal /> : console.log("do nothing")}
      </div>
      <ul className="Projects list-group mt-2" data-bs-theme="dark">
        {projects.map((project) => {
          return (
            <Link
              to={
                location.pathname === "/projects"
                  ? project._id
                  : console.log("do nothing")
              }
              key={project._id}
              style={style}
            >
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1 text-primary">{project.projectName}</h5>
                  <small style={{ color: Date.parse(project.deadline) < Date.parse(today) ? `red` : `whitesmoke` }}>
                    {location.pathname === '/projects' ? 
                    <Icon.Trash3Fill
                      id={project._id}
                      color="whitesmoke"
                      size={25}
                      onClick={handleTrash}
                    ></Icon.Trash3Fill> 
                    : console.log("do nothing")}
                    Deadline: {project.deadline}
                  </small>
                </div>
                <p className="mb-1 text-start">{project.description}</p>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Example with label"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar"
                    style={{ width: `${project.completion}% ` }}
                  >
                    {project.completion}%
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT, ASSIGN_TASK, ADD_TASK } from "../utils/mutations";
import { QUERY_PROJECTS } from "../utils/queries";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import SingleProject from "./SingleProject";

export default function Projects() {
  const { data: projectData, loading: projectLoading } = useQuery(QUERY_PROJECTS);
  const projects = projectData?.projects || [];

const [addProject, {error}] = useMutation(ADD_PROJECT);

  const location = useLocation();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    projectName: "",
    description: "",
  });

  async function handleClick(event) {
    event.preventDefault();

    try {
        const {data} = await addProject({
            variables: {
                projectName: formState.projectName,
                description: formState.description
            }
        });
        window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "projectName") {
      setFormState({ ...formState, [name]: value });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div className="container-fluid">
      <div className="Projects row mt-5">
        <div className="project-list col">
          {projectLoading? <h1>loading...</h1> : <ProjectCard projects={projects} />}
        </div>

        
      </div>
    </div>
  );
}

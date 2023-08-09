import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS, QUERY_TASKS, QUERY_USERS } from "../utils/queries";
import TeamCard from "../components/TeamCard";
import ProjectCard from "../components/ProjectCard";
import ProjectTaskCard from "../components/ProjectTaskCard";

export default function Profile() {
  const { data: projectData } = useQuery(QUERY_PROJECTS);
  const { data: taskData } = useQuery(QUERY_TASKS);
  const { data: userData } = useQuery(QUERY_USERS);
  const { data: myData } = useQuery(QUERY_ME);

  const profile = myData?.me || [];
  const projects = projectData?.projects || [];
  const tasks = taskData?.tasks || [];
  const users = userData?.users || [];

  let meProjects = projects.filter((project) => {
    for (let i = 0; i < profile.projects.length; i++) {
      if (profile.projects[i]._id === project._id) {
        return project;
      }
    }
  });

// let meTasks = tasks.filter((task) => {
//     for (let i = 0; i < meProjects.tasks.length; i++) {
//       if (meProjects.tasks[i]._id === task._id) {
//         return task;
//       }
//     }
//   });

  return (
    <div className="Profile container mt-5" data-bs-theme="dark">
      <div className="profile-header container col-11 d-flex align-items-center">
        <img src={profile.image}></img>
        <h1>{profile.username}</h1>
      </div>
      <div className="container-fluid mt-3">
        <div className="row gap-2 d-flex justify-content-center">
          <div className="profile-left col-7">
            <div className="card">
            <ProjectTaskCard projects={meProjects} />
            </div>
          </div>
          <div className="profile-right col-4">
            <TeamCard users={users}/>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_PROJECTS,
  QUERY_TASKS,
  QUERY_USERS,
} from "../utils/queries";
import TeamCard from "../components/UserCard";
import ProjectCard from "../components/ProjectCard";
import CreateTeam from "../components/CreateTeam";

export default function Profile() {
  const { data: projectData } = useQuery(QUERY_PROJECTS);
  const { data: taskData } = useQuery(QUERY_TASKS);
  const { data: userData } = useQuery(QUERY_USERS);
  const { data: myData } = useQuery(QUERY_ME);

  const profile = myData?.me || [];
  const projects = projectData?.projects || [];
  const tasks = taskData?.tasks || [];
  const users = userData?.users || [];

  return (
    <div className="Profile container mt-5" data-bs-theme="dark">
      <div className="profile-header container col-11 d-flex align-items-center">
        <img id="pfp" src={profile.image} alt=""></img>
        <h1>{profile.username}</h1>
      </div>
      <div className="container-fluid mt-3">
        <div className="row gap-2 d-flex justify-content-center">
          <div className="profile-left col-7">
            <ProjectCard projects={projects} />
          </div>
          <div className="profile-right col-4">
            <TeamCard users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}

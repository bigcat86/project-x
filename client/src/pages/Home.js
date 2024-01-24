import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import NavBar from "../components/NavBar";
import ProjectCard from "../components/ProjectCard";
import UserCard from "../components/UserCard";
import ChartDonut from "../components/ChartDonut";
import TaskCard from "../components/TaskCard";

import { QUERY_PROJECTS, QUERY_USERS, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import TeamModal from "../components/modals/TeamModal";

export default function Home() {
  const { data: userData } = useQuery(QUERY_USERS);
  const { data: projectData } = useQuery(QUERY_PROJECTS);
  const { data: myData } = useQuery(QUERY_ME);

  const users = userData?.users || [];
  const projects = projectData?.projects || [];
  const profile = myData?.me || [];

  // let meProjects = projects.filter((project) => {
  //   for (let i = 0; i < profile.projects.length; i++) {
  //     if (profile.projects[i]._id === project._id) {
  //       return project;
  //     }
  //   }
  // });

  return (
    <div className="container-fluid text-center mt-5">
      <div className="row text-center">
        <div className="home-left col-6">
          <ProjectCard projects={projects} profile={profile} />
          {/* <TaskCard myTasks={profile.tasks} /> */}
        </div>
        <div className="col-6 d-flex flex-column">
          <div className="donut">
            <ChartDonut projects={projects} />
          </div>
          <div className="team">
            <UserCard users={users} myTeams={profile.teams} />
          </div>
        </div>
      </div>
    </div>
  );
}

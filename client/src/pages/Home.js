import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import NavBar from "../components/NavBar";
import ProjectCard from "../components/ProjectCard";
import UserCard from "../components/UserCard";
import ChartDonut from "../components/ChartDonut";
import TaskCard from "../components/TaskCard";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

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
        </div>
        <div className="row">
          <div className="col-6">
            <UserCard users={users} myTeams={profile.teams} />
          </div>
          <div className="socials col-6 d-flex align-items-end justify-content-around">
            <Link to={"javascript:void(0)"} target="_blank" onClick={() => window.location = 'mailto:attanner86@gmail.com'}>
              <Icon.EnvelopeAt className="social-icon" color="whitesmoke" size={50} />
            </Link>
            <Link to={"https://github.com/bigcat86/project-x"} target="_blank">
              <Icon.Github  className="social-icon" color="whitesmoke" size={50} />
            </Link>
            <Link to={"https://aarontanner.io"} target="_blank">
              <Icon.Globe2  className="social-icon" color="whitesmoke" size={50} />
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

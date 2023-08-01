import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import NavBar from "../components/NavBar";
import ProjectCard from "../components/ProjectCard";
import TeamCard from "../components/TeamCard";
import ChartDonut from "../components/ChartDonut";

import { QUERY_PROJECTS, QUERY_USERS } from "../utils/queries";

export default function Home() {
  const { data: userData } = useQuery(QUERY_USERS);
  const { data: projectData } = useQuery(QUERY_PROJECTS);

  const users = userData?.users || [];
  const projects = projectData?.projects || [];

  return (
    <div className="container-fluid text-center">
      <div className="row text-center">
        <div className="col-6">
          <ProjectCard projects={projects} />
        </div>
        <div className="col-6 d-flex flex-column">
          <div className="donut">
            <ChartDonut />
          </div>
          <div className="team">
            <TeamCard users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}

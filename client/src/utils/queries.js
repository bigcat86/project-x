import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      id
      username
      image
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query allProjects {
    projects {
      id
      projectName
      description
      deadline
      completion
      completed
    }
  }
`;

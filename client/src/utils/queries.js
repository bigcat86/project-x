import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      image
      projects {
        _id
      }
      tasks {
        _id
      }
      teams{
        _id
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      image
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query allProjects {
    projects {
      _id
      projectName
      description
      deadline
      completion
      completed
    }
  }
`;

export const QUERY_TASKS = gql`
  query allTasks {
    tasks {
      _id
      taskName
      description
      projectId
      deadline
      completion
      completed
    }
  }
`;

export const QUERY_MYPROJECTS = gql`
  query myProjects($userId: ID!) {
    projects(userId: $userId) {
      _id
      projectName
      description
      deadline
      completion
      completed
    }
  }
`;

export const QUERY_MYTASKS = gql`
  query myTasks($userId: ID!) {
    tasks(userId: $userId) {
      _id
      taskName
      description
      projectId
      deadline
      completion
      completed
      users {
        _id
        username
      }
    }
  }
`;

export const QUERY_MYTEAMS = gql`
  query myTeams($userId: ID!) {
    teams(userId: $userId) {
      _id
      teamName
      projectId
      teamLead
      users {
        _id
        username
      }
    }
  }
`;

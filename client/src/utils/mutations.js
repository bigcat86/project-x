import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($taskName: String!, $description: String!, $projectId: ID!) {
    addTask(
      taskName: $taskName
      description: $description
      projectId: $projectId
    ) {
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

export const ADD_PROJECT = gql`
  mutation addProject($projectName: String!, $description: String!) {
    addProject(projectName: $projectName, description: $description) {
      _id
      projectName
      description
      deadline
      completion
      completed
      tasks {
        _id
        taskName
      }
      teams {
        _id
        teamName
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation removeTask($taskId: ID!, $projectId: ID!) {
    removeTask(taskId: $taskId, projectId: $projectId) {
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

export const ASSIGN_TASK = gql`
  mutation assignTask($userId: ID!, $taskId: ID!) {
    assignTask(userId: $userId, taskID: $taskId) {
      user {
        _id
        username
        tasks {
          _id
        }
      }
    }
  }
`;

export const addTeammate = gql`
  mutation addTeammate($userId: ID!, $teamId: ID!) {
    addTeammate(userId: $userId, teamId: $teamId) {
      team {
        _id
        teamName
        users {
          _id
          username
        }
      }
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam($teamName: String!, $teamLead: String!) {
    createTeam(teamName: $teamName, teamLead: $teamLead) {
      team {
        _id
        teamName
        teamLead 
        users {
          _id
          username
        }
      }
    }
  }
`;
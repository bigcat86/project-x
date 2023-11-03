const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    image: String   
    projects: [Project]
    tasks: [Task]
    teams: [Team]
  }

  input UserData {
    _id: ID!
    username: String!
    email: String
    password: String
    image: String   
    projects: [ProjectData]
    tasks: [TaskData]
    teams: [TeamData]
  }

  type Project {
    _id: ID!
    projectName: String!
    description: String!
    deadline: String
    completion: Int!
    completed: Boolean!
    tasks: [Task]
    teams: [Team]
  }

  input ProjectData {
    _id: ID!
    projectName: String!
    description: String!
    deadline: String
    completion: Int!
    completed: Boolean!
    tasks: [TaskData]
    teams: [TeamData]
  }

  type Task {
    _id: ID!
    taskName: String!
    description: String
    projectId: ID!
    deadline: String
    completion: Int!
    completed: Boolean!
    users: [User]
  }

  input TaskData {
    _id: ID!
    taskName: String!
    description: String
    projectId: ID!
    deadline: String
    completion: Int!
    completed: Boolean!
    users: [UserData]
  }

  type Team {
    _id: ID!
    teamName: String!
    projectId: ID
    teamLead: User!
    users: [ID]!
  }

  input TeamData {
    _id: ID!
    teamName: String!
    projectId: ID
    teamLead: ID!
    users: [ID]!
  }

  type taskResponse {
    success: Boolean
    task: Task
  }

  type projectResponse {
    success: Boolean
    project: Project
  }

  type teamResponse {
    success: Boolean
    team: Team
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    teams: [Team]
    projects: [Project]
    tasks: [Task]
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTask(taskName: String!, description: String!, projectId: ID!): Task
    removeTask(taskId: ID!, projectId: ID!): Task
    addProject(projectName: String!, description: String!): Project
    removeProject(projectId: ID!): Project
    assignTask(userId: ID!, taskID: ID!): User
    createTeam(teamName: String!, teamLead: String!): teamResponse
    addTeammate(userId: ID!, teamId: ID!): teamResponse
    updateProject(project: ProjectData): Project
    updateTask(task: TaskData): Task
  }
`;

module.exports = typeDefs;


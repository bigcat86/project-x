const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    image: String   
    projects: [Project]
    tasks: [Task]
    teams: [Team]
  }

  type Project {
    id: ID!
    projectName: String!
    description: String!
    deadline: String
    completion: Int!
    completed: Boolean!
    tasks: [Task]
    teams: [Team]
  }

  input ProjectData {
    id: ID!
    projectName: String!
    description: String!
    deadline: String
    completion: Int!
    completed: Boolean!
    tasks: [Task]
    teams: [Team]
  }

  type Task {
    id: ID!
    taskName: String!
    description: String!
    project: Project!
    deadline: String
    completion: Int!
    completed: Boolean!
    users: [User]
  }

  input TaskData {
    id: ID!
    taskName: String!
    description: String!
    project: Project!
    deadline: String
    completion: Int!
    completed: Boolean!
    users: [User]
  }

  type Team {
    id: ID!
    teamName: String!
    project: Project
    teamLead: User!
    users: [User]!
  }

  type taskResponse {
    success: Boolean
    task: Task
  }

  type projectResponse {
    success: Boolean
    project: Project
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
    addTask(task: TaskData): taskResponse
    addProject(project: ProjectData): projectResponse
    assignTask(userId: ID!, task: TaskData): taskResponse
  }
`;

module.exports = typeDefs;
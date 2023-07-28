const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!   
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
    tasks: [Task]
  }

  type Task {
    id: ID!
    taskName: String!
    description: String!
    deadline: String
    completion: Int!
  }

  type Team {
    id: ID!
    teamName: String!
    project: Project
    teamLead: User!
    users: [User]!
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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!):Auth
  }
`;

module.exports = typeDefs;
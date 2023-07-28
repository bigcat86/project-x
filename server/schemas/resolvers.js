const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Project, Task, Team } = require("../models");

const resolvers = {
  Query: {
    users: async (parent, args) => {
        return User.find({});
    },
    teams: async (parent, args) => {
        return Team.find({});
    },
    projects: async (parent, args) => {
        return Project.find({});
    },
    tasks: async (parent, args) => {
        return Task.find({});
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
        try {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        } catch (error) {
          console.log(error)
        }
      }
    }
}

module.exports = resolvers;
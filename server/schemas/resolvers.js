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
      return Project.find({}).populate("task");
    },
    tasks: async (parent, args) => {
      return Task.find({});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user._id);
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    myProjects: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user.projects;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    myTasks: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user.tasks;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    myTeams: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user.teams;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    addTask: async (parent, { taskName, description, projectId }) => {
      try {
        const task = await Task.create({ taskName, description, projectId });
        const project = await Project.findOneAndUpdate(
          { _id: task.projectId },
          {
            $addToSet: {
              tasks: { tasks: task },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              tasks:  task 
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(task);
        return task;
      } catch (error) {
        console.log(error);
      }
    },
    removeTask: async (parent, { taskId, projectId }) => {
      try {
        const task = await Task.findOneAndDelete({ _id: taskId });
        const project = await Project.findOneAndUpdate(
          { _id: projectId },
          { $pull: { tasks: { _id: taskId } } },
          { new: true }
        );
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: { _id: taskId } } },
          { new: true }
        );
        return task;
      } catch (error) {
        console.log(error);
      }
    },
    addProject: async (parent, { projectName, description }, context) => {
      try {
        if (context.user) {
          const project = await Project.create({ projectName, description });
          const myProject = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: { projects: { _id: project._id } },
            },
            { new: true }
          );
          console.log(myProject);
          return project;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;

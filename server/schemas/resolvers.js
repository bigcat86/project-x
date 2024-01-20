const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Project, Task, Team } = require("../models");

const resolvers = {
  Query: {
    users: async (parent, args) => {
      return User.find({}).populate("projects").populate("tasks").populate("teams");
    },
    teams: async (parent, args) => {
      return Team.find({}).populate("users");
    },
    projects: async (parent, args) => {
      return Project.find({}).populate("tasks").populate("teams");
    },
    tasks: async (parent, args) => {
      return Task.find({}).populate("users").populate("projects");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user._id);
        return User.findOne({ _id: context.user._id });
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
    addTask: async (parent, { taskName, description, projectId }, context) => {
      try {
        const task = await Task.create({ taskName, description, projectId });
        const project = await Project.findOneAndUpdate(
          { _id: task.projectId },
          {
            $addToSet: {
              tasks: { _id: task._id }
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
              tasks: { _id: task._id }
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
          // const user = await User.findOneAndUpdate(
          //   { _id: context.user._id },
          //   { $pull: { tasks: { _id: taskId } } },
          //   { new: true }
          // );
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
    removeProject: async (parent, { projectId }, context) => {
      try {
        const project = await Project.findOneAndDelete({ _id: projectId });
        const tasks = await Task.deleteMany({projectId: project._id})
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: { _id: projectId } } },
          { new: true }
        );
        return project;
      } catch (error) {
        console.error(error);
      }
    },
    addTeammate: async (parent, {userId, teamId}) => {
      try {
        const team = await Team.findByIdAndUpdate(
          { _id: teamId },
          { $addToSet: { users: { _id: userId }}},
          { new: true }
        );
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { teams: { _id: teamId }}},
          { new: true }
        )
      } catch (error) {
        console.error(error)
      }
    },
    assignTask: async (parent, { userId, taskId }) => {
      try {
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { tasks : { _id: taskId }}},
          { new: true }
          );
        const task = await Task.findByIdAndUpdate(
          { _id: taskId },
          { $addToSet: { users: { _id: userId }}},
          { new: true }
        );
        return user;
      } catch (error) {
        console.error(error);
      }
      
    },
    createTeam: async (parent, { teamName, teamLead }, conext) => {
      try {
        const team = await Team.create({ teamName, teamLead});
        const user = await User.findByIdAndUpdate(
          { _id: conext.user._id },
          { $addToSet: { teams: { teamName: team.teamName, _id: team._id }}},
          { new: true }
        );
        return team;
      } catch (error) {
        console.error(error);
      }
    },
    completeTask: async (parent, { taskId }) => {
      try {
        const task = await Task.findById({ _id: taskId });
        const taskUpdate = await Task.findByIdAndUpdate(
          { _id: taskId },
          { $set: { completed: task.completed ? false : true }},
          { new: true }
        );
        return taskUpdate;
      } catch (error) {
        console.error(error);
      }
  },
  completeProject: async (parent, { projectId }) => {
    try {
      const project = await Project.findById({ _id: projectId });
      const projectUpdate = await Project.findByIdAndUpdate(
        { _id: projectId },
        { $set: { completed: project.completed ? false : true }},
        { new: true }
      );
      return projectUpdate;
    } catch (error) {
      console.error(error);
    }
  },
},
};

module.exports = resolvers;

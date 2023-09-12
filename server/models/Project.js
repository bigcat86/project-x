const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
      default: Date.now,
      get: local,
    },
    completion: {
      type: Number,
      default: 0,
      max: 100,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

projectSchema.virtual("taskCount").get(function () {
  return this.tasks.length;
});

function local(date) {
  return date.toLocaleDateString("en-US");
}

const Project = model("Project", projectSchema);

module.exports = Project;

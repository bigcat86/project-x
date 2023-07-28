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
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "task",
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

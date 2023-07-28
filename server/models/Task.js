const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    taskName: {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

taskSchema.virtual("taskCount").get(function () {
  return this.tasks.length;
});

function local(date) {
  return date.toLocaleDateString("en-US");
}

const Task = model("Task", taskSchema);

module.exports = Task;
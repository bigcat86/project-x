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
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "project",
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
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

taskSchema.virtual("userCount").get(function () {
  return this.users.length;
});

function local(date) {
  return date.toLocaleDateString("en-US");
}

const Task = model("Task", taskSchema);

module.exports = Task;

const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
    teamLead: {
      type: Schema.Types.ObjectId,
      ref: "user",
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
teamSchema.virtual("userCount").get(function () {
  return this.users.length;
});

const Team = model("Team", teamSchema);

module.exports = Team;

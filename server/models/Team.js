const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    teamLead: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
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

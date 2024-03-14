const { Schema, model } = require("mongoose");
//const Reaction = require("./Reaction");
const reactionSchema = require("./Reaction");


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

function dateFormat(date) {
  return date.toLocaleDateString();
}

thoughtSchema
  .virtual('getReactions')
  .get(function () {
    return this.reactions.length;
  });
const Thought = model("thought", thoughtSchema);

module.exports = Thought;

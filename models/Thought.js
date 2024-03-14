const { Schema, model } = require("mongoose");
//import reactionSchema
const reactionSchema = require("./Reaction");

//Create thoughtSchema
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
    //use reactionSchema to create reactions as a subdocument
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
//format date
function dateFormat(date) {
  return date.toLocaleDateString();
}
//Create virtual for reaction count
thoughtSchema.virtual("getReactions").get(function () {
  return this.reactions.length;
});

//Create thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;

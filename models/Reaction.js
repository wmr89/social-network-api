const { Schema, model, Mongoose } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
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
});

function dateFormat(date) {
  return date.toLocaleDateString();
}
const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;

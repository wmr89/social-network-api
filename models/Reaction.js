const { Schema, Types } = require("mongoose");
//Create Reaction Schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
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
},
{
  //Remove _id creation to keep 'reactionID' as only generated ID
  _id: false
}
);
//Format date
function dateFormat(date) {
  return date.toLocaleDateString();
}
//Export schema
module.exports = reactionSchema;

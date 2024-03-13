const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      trimmed: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema
.virtual('friendCount')
.get(function(){
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;

const { Schema, model } = require("mongoose");
//create user schema
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
      //use match to validate email
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
//Create virtual to create friend count
userSchema
.virtual('friendCount')
.get(function(){
    return this.friends.length
})
//Create User model
const User = model('user', userSchema);

module.exports = User;

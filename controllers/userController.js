const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models/');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// Update User
async updateUser(req, res) {
  try {
    const oldUserInfo = await User.findOne(
      { _id: req.params.userId }
    ).select('-__v');
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    ).select('-__v');

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // Update associated thoughts
    await Thought.updateMany(
      { username: oldUserInfo.username },
      { $set: { username: req.body.username } }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
},

// Delete User
async deleteUser(req, res) {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.userId }).select('-__v');

    if (!deletedUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // Delete associated thoughts
    await Thought.deleteMany({ username: deletedUser.username });

    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
},
};

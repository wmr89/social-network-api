const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models/");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const user = await Thought.findOne({ _id: req.params.thoughtId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: dbThoughtData } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update Thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      ).select("-__v");

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete Thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      // Also remove the thought from associated user's thoughts array
      await User.updateOne(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new reaction
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "Reaction created, but found no thought with that ID",
        });
      }
      res.json(reaction);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  // Delete reaction
  async deleteReaction(req, res) {
    try {
      const deletedReaction = await Reaction.findOneAndDelete({
        reactionId: req.params.reactionId,
      }).select("-__v");

      if (!deletedReaction) {
        return res.status(404).json({ message: "No reaction with that ID" });
      }

      // Also remove the thought from associated user's thoughts array
      await Thought.updateOne(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } }
      );

      res.json(deletedReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

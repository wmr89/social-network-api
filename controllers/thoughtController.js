//Import User and Thought model
const { User, Thought} = require("../models/");

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get single thought by ID
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
      //Add thought ID to user thoughts array
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: dbThoughtData } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but no user found with that ID",
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
        //find thought with matching ID
        { _id: req.params.thoughtId },
        //update thought with passed body data
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
        //find thought with matching ID
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      // Remove thought from associated user thoughts array
      await User.updateOne(
        //Find user that had matching thoughtID in thoughts array
        { thoughts: req.params.thoughtId },
        //Delete from thoughts array
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
      const reaction = await req.body;
      //Find thought by ID
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        //add body data as a reaction to the thought
        { $addToSet: { reactions: reaction } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought found with that ID",
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
      const deletedReaction = await Thought.updateOne(
        //Find thought by ID
        { _id: req.params.thoughtId },
        //remove reaction from thought's reactions array
        { $pull: { reactions: {reactionId: req.params.reactionId } }}
      );

      res.json(deletedReaction);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
};

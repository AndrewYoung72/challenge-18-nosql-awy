const Thought = require("../models/Thought");
const User = require("../models/User")

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtCreated) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtCreated._id } },
          { runValidators: true, new: true }
        ).then((user) =>
          !user
            ? res.status(404).json({ message: "This user does not exist!" })
            : res.json(user)
        );
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $pull: { thoughts:  deletedThought._id }},
          { runValidators: true, new: true }
        ).then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: "No such user exists, silly person!" })
            : res.json(user)
        );
      })
      .then(() => res.json({ message: "Thought and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

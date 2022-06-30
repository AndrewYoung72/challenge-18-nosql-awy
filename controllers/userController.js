const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((socialNetworkDB) => res.json(socialNetworkDB))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "This user does not exist" })
          : Thought.findOneAndUpdate(
              { user: req.params.userId },
              { $pull: { user: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "User removed but no thoughts found." })
          : res.json({ message: "All user data was deleted." })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add a thought to a user
  addThought(req, res) {
    console.log("Thought is being added to user ID");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thought: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "This user does not exist!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a thought from a user
  removeThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thought: { thoughtId: req.params.thoughtId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No such user exists, silly person!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

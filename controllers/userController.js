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
      .then((createdUser) => res.json(createdUser))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "This user does not exist" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
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

  createFriend(req, res) {
    User.create(req.body)
      .then((createFriend) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { friends: createFriend._id } },
          { runValidators: true, new: true }
        ).then((user) =>
          !user
            ? res.status(404).json({ message: "No user with this id!" })
            : res.json(user, { message: "Friend was added!" })
        );
      })
      .catch((err) => res.status(500).json(err));
  },
};

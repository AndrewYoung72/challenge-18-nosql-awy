const mongoose = require("mongoose");
// const { Schema, model } = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Not a matching email address",
      ],
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

const User = mongoose.model("user", userSchema);

module.exports = User;

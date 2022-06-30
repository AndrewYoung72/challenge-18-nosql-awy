const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema(
{
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  }
},
{
  toJSON: {
    getters: true,
  },
}
);


const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
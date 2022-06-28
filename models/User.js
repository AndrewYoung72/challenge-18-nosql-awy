const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  thoughts: [thoughtSchema],
  friends: [userSchema],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

userSchema
.virtual("friendCount").get(function () {
  return `${this.friends.length}`
});

const User = model('user', userSchema);

module.exports = User;
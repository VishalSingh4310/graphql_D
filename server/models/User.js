const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    name: String,
    email: String,
    postIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    follower: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bio: String,
    avatar: String,
  })
);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Likes = mongoose.model(
  "Likes",
  new Schema({
    likeCount: Number,
    likeUsers: [
      {
        time: String,
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    postId: String,
  })
);

module.exports = Likes;

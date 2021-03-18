const { request } = require("express");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = mongoose.model(
  "Comment",
  new Schema({
    CommentCount: Number,
    CommentUsers: [
      {
        comment: String,
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

module.exports = Comment;

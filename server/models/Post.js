const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = mongoose.model(
  "Post",
  new Schema({
    post_name: String,
    post_img: String,
    post_time: String,
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    caption: String,
    // likes:String,
    // comments:String
    likes: {
      type: Schema.Types.ObjectId,
      ref: "Likes",
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  })
);

module.exports = Post;

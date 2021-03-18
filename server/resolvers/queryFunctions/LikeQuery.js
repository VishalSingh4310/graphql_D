const Likes = require("../../models/Likes");

exports.FetchLikes = async (id) => {
  try {
    console.log(id);
    const likes = Likes.find({ _id: id }).populate("userId");
    console.log("likes:", likes);
    return likes;
  } catch (err) {
    throw err;
  }
};

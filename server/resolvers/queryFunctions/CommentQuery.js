const Comment = require("../../models/Comment");

exports.FetchComment = async (id) => {
  try {
    const comments = Comment.findOne({ _id: id }).populate("userId");
    return comments;
  } catch (err) {
    throw err;
  }
};

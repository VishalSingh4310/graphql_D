const Comment = require("../../models/Comment");

exports.CreateComment = async (_, { comment, userId, postId }) => {
  try {
    const insertComment = {
      comment: comment,
      time: new Date().toISOString(),
      userId: userId,
    };
    const newComment = await Comment.findOne({ postId: postId }).populate(
      "userId"
    );
    newComment.CommentCount = newComment.CommentCount + 1;
    newComment.CommentUsers = [...newComment.CommentUsers, insertComment];
    await newComment.save();
    if (!!newComment == false) {
      throw new Error("Comment not found");
    }
    let updateComment = newComment.CommentUsers.find(
      (user) => user.userId == userId
    );
    // console.log(newComment);
    return updateComment;
  } catch (err) {
    throw err;
  }
};

const Likes = require("../../models/Likes");
exports.removeLike = async (_, { userId, postId }) => {
  try {
    const newLike = await Likes.findOne({ postId: postId }).populate("userId");
    newLike.likeCount = newLike.likeCount - 1;
    newLike.likeUsers = newLike.likeUsers.filter(
      (like) => like.userId !== userId
    );
    await newLike.save();
    if (!!newLike == false) {
      throw new Error("Comment not found");
    }
    return newLike;
  } catch (err) {
    throw err;
  }
};

exports.CreateLike = async (_, { userId, postId }) => {
  const insertLike = {
    time: new Date().toISOString(),
    userId: userId,
  };
  try {
    const newLike = await Likes.findOne({ postId: postId }).populate("userId");
    // console.log(typeof newLike.id);
    if (
      newLike.likeUsers.findIndex(
        (like) => like.userId.toString() === userId
      ) === -1
    ) {
      newLike.likeCount = newLike.likeCount + 1;
      newLike.likeUsers = [...newLike.likeUsers, insertLike];
      await newLike.save();
      if (!!newLike == false) {
        throw new Error("Comment not found");
      }
      // console.log(newLike);
      return newLike;
    } else if (
      newLike.likeUsers.find((like) => like.userId.toString() === userId)
    ) {
      (newLike.likeCount = newLike.likeCount > 0 && newLike.likeCount - 1),
        (newLike.likeUsers = newLike.likeUsers.filter(
          (like) => like.userId.toString() !== userId
        ));
      await newLike.save();
      if (!!newLike == false) {
        throw new Error("Comment not found");
      }
      return newLike;
    }
  } catch (err) {
    throw err;
  }
};

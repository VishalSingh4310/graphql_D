const Post = require("../../models/Post");

const findUser = async (id) => {
  const data = await User.findById(id);
  return data;
};

exports.Posts = async () => {
  try {
    const posts = await Post.find()
      .populate("postedBy")
      .populate("likes")
      .populate("comments");
    if (!posts) {
      console.log("post not found");
    }

    return posts.map((post) => {
      return {
        ...post._doc,
        id: post.id,
      };
    });
    // return posts;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.FetchPost = async (_, { id }) => {
  try {
    const fetchPost = await Post.findOne({ _id: id }).populate("postedBy");
    return fetchPost;
  } catch (err) {
    console.log("thrw", err);
    throw err;
  }
};

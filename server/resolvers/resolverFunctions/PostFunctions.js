const User = require("../../models/User");
const Comment = require("../../models/Comment");
const Likes = require("../../models/Likes");
const Post = require("../../models/Post");
const { find } = require("../../models/Post");

const findUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
const findLike = async (id) => {
  const data = await Likes.findById(id);
  return data;
};
const findComment = async (id) => {
  const data = await Comment.findById(id);
  return data;
};

exports.CreatePost = async (_, { post_img, post_name, post_time, caption }) => {
  const date = new Date().toISOString();
  const postedBy = "604b7e8129eceed771df2983";
  try {
    const newPost = new Post({
      post_img,
      post_name,
      post_time: date,
      postedBy,
      caption,
    });
    await newPost.save();
    const defaultLike = new Likes({
      likeCount: 0,
      likeUsers: [],
      postId: newPost.id,
    });
    await defaultLike.save();
    const defaultComment = new Comment({
      CommentCount: 0,
      CommentUsers: [],
      postId: newPost.id,
    });
    await defaultComment.save();
    const userUpdate = await User.findOne({ _id: postedBy }, (err, data) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
      data.postIds = [...data.postIds, newPost.id];
      data.save();
    });

    // console.log(newPost, defaultLike, defaultComment);
    await Post.updateOne(
      { _id: newPost.id },
      {
        $set: {
          likes: defaultLike.id,
          comments: defaultComment.id,
        },
      },
      {
        upsert: false,
      }
    );
    let UpdatePost = {
      ...newPost._doc,
      id: newPost.id,
      likes: findLike.bind(this, defaultLike.id),
      comments: findComment.bind(this, defaultComment.id),
      postedBy: findUser.bind(this, postedBy),
    };
    console.log(UpdatePost);
    return UpdatePost;
  } catch (err) {
    console.log(err);
  }
};

exports.DeletePost = async (_, { id }) => {
  try {
    const findPost = await Post.findById({ _id: id });
    const findUserPostId = await User.findOne({
      _id: "604b7e8129eceed771df2983",
    });
    const test = await User.updateOne(
      { _id: "604b7e8129eceed771df2983" },
      {
        $set: {
          postIds: findUserPostId.postIds.filter(
            (ids) => ids.toString() !== id
          ),
        },
      }
    );

    await Likes.deleteOne({ postId: id });
    await Comment.deleteOne({ postId: id });
    await Post.deleteOne({ _id: id });
    return findPost;
  } catch (err) {
    console.log(err);
  }
};

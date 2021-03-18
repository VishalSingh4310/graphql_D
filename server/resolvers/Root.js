const { DeleteUser, CreateUser } = require("./resolverFunctions/UserFunctions");
const { CreatePost, DeletePost } = require("./resolverFunctions/PostFunctions");
const { CreateLike, removeLike } = require("./resolverFunctions/LikeFunctions");
const { CreateComment } = require("./resolverFunctions/CommentFunctions");

const { Users, FetchUser } = require("./queryFunctions/UserQuery");
const { Posts, FetchPost } = require("./queryFunctions/PostQuery");
const { FetchLikes } = require("./queryFunctions/LikeQuery");
const { FetchComment } = require("./queryFunctions/CommentQuery");

const resolvers = {
  Query: {
    users: Users,
    posts: Posts,
    likes: FetchLikes,
    comments: FetchComment,
    user: FetchUser,
    post: FetchPost,
  },

  Mutation: {
    // create new User
    createUser: CreateUser,

    // create new Post
    createPost: CreatePost,

    // // create new Like
    createLike: CreateLike,

    removeLike: removeLike,

    //new comment
    createComment: CreateComment,

    // delete Post
    deletePost: DeletePost,

    // delete user
    deleteUser: DeleteUser,
  },
};

module.exports = resolvers;

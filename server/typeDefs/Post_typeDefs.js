exports.PostTypeDefs = `
  type Post {
    id: ID!
    post_name: String!
    post_img: String!
    post_time: String!
    postedBy: User!
    caption: String
    likes: Like!
    comments: Comment!
  }
`;
exports.PostQuery = `
post(id: ID!): Post
posts: [Post!] 
`;

exports.PostMutation = `
createPost(
      post_img: String!
      post_name: String!
      post_time: String!
      caption: String
    ): Post!
deletePost(id: ID!): Post!
`;

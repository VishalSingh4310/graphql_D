exports.CommentTypeDefs = `
  type Comment {
    id: ID!
    CommentCount: Int!
    CommentUsers: [CommentUser]
    postId: ID!
  }
type CommentUser {
    comment: String!
    time: String!
    userId: User!
  }
`;
exports.CommentQuery = `
comments(id: ID!): Comment
`;
exports.CommentMutation = `
createComment(comment: String!, userId: ID!, postId: String!): CommentUser!
`;

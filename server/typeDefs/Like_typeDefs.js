exports.LikeTypeDefs = `
  type Like {
    id: ID!
    likeCount: Int!
    likeUsers: [LikeUser]
    postId: ID!
  }
type LikeUser {
    time: String!
    userId: User!
  }
`;

exports.LikeQuery = `
likes(id: ID!): Like

`;

exports.LikeMutation = `
 createLike(userId: ID!, postId: ID!): Like! 
 removeLike(userId: ID!, postId: ID!): Like!
`;

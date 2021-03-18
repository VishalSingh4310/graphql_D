exports.UsertypeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    postIds: [Post!]
    follower: [String]
    following: [String]
    bio: String
    avatar: String
  }
`;

exports.UserQuery = `
users: [User!]
user(id: ID!): User
`;

exports.UserMutation = `
  createUser(name: String!, email: String!, avatar: String): User!
  deleteUser(id: ID!): User!
`;

const { gql } = require("apollo-server-express");
const {
  CommentTypeDefs,
  CommentMutation,
  CommentQuery,
} = require("./Comment_typeDefs");
const { UsertypeDefs, UserMutation, UserQuery } = require("./User_typeDefs");
const { PostTypeDefs, PostMutation, PostQuery } = require("./Post_typeDefs");
const { LikeMutation, LikeTypeDefs, LikeQuery } = require("./Like_typeDefs");

const typeDefs = gql`

    ${UsertypeDefs}
    ${PostTypeDefs}
    ${LikeTypeDefs}
    ${CommentTypeDefs}

    type Query {  
    ${UserQuery} 
    ${PostQuery}  
    ${LikeQuery}   
    ${CommentQuery}
    }
      
    type Mutation {
    ${UserMutation}
    ${PostMutation}
    ${LikeMutation}
    ${CommentMutation}
    }
`;

module.exports = typeDefs;

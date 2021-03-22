import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query users {
    users {
      id
      name
    }
  }
`;
export const GET_POSTS = gql`
  query posts {
    posts {
      id
      post_name
      post_img
      post_time
      caption
      likes {
        likeCount
      }
      comments {
        CommentCount
      }
    }
  }
`;

export const GET_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      name
      email
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $post_img: String!
    $post_name: String!
    $post_time: String!
    $caption: String!
  ) {
    createPost(
      post_img: $post_img
      post_name: $post_name
      post_time: $post_time
      caption: $caption
    ) {
      id
      post_img
      post_name
      post_time
      caption
      postedBy {
        name
      }
      likes {
        likeCount
      }
      comments {
        CommentCount
      }
    }
  }
`;
export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
      post_name
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;
export const CREATE_LIKE = gql`
  mutation createLike($userId: ID!, $postId: ID!) {
    createLike(userId: $userId, postId: $postId) {
      id
      likeCount
    }
  }
`;

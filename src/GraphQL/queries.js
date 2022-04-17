import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query getUser($username: String!) {
    user(username: $username) {
      id
      username
      createDate
      posts {
        id
        title
        content
        username
      }
    }
  }
`;

export const GET_USERS_QUERY = gql`
  {
    users {
      id
      username
      posts {
        title
      }
    }
  }
`;

export const GET_POST_QUERY = gql`
  query getPost($id: String!) {
    post(id: $id) {
      title
      content
      image
      username
    }
  }
`;

export const GET_USER_POSTS = gql`
  query getUserPosts($username: String!) {
    userPosts(username: $username) {
      title
      content
      id
      image
    }
  }
`;

export const GET_POSTS_QUERY = gql`
  {
    posts {
      id
      title
      content
      username
    }
  }
`;

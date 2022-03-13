import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  {
    user(id: "622cd3001a05e78573bb1b1e") {
      id
      username
      posts {
        title
        content
        id
        user {
          username
        }
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
  {
    post(id: "622cda1bdc590987450a7e5b") {
      title
      content
      image
      user {
        id
        username
      }
    }
  }
`;

export const GET_POSTS_QUERY = gql`
  {
    posts {
      id
      title
      user {
        id
        username
      }
    }
  }
`;

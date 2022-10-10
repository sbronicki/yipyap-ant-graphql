import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $username: String!
    $title: String!
    $content: String!
    $image: String
  ) {
    createPost(
      username: $username
      title: $title
      content: $content
      image: $image
    ) {
      id
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $content: String
    $image: String
  ) {
    updatePost(id: $id, title: $title, content: $content, image: $image) {
      id
      title
      content
      image
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      id
      email
      username
      created
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      id
      username
      email
      bio
      profileImg
      bannerImg
      created
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: ID!
    $bio: String
    $profileImg: String
    $bannerImg: String
  ) {
    updateUser(
      id: $id
      bio: $bio
      profileImg: $profileImg
      bannerImg: $bannerImg
    ) {
      id
      bio
      profileImg
      bannerImg
    }
  }
`;

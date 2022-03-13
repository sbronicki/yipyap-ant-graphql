import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $userID: ID!
    $title: String!
    $content: String!
    $image: String
  ) {
    createPost(
      userID: $userID
      title: $title
      content: $content
      image: $image
    ) {
      id
      title
      user {
        username
      }
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
      post {
        title
        id
      }
    }
  }
`;

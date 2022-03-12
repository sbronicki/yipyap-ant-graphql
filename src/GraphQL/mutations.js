import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $image: String
    $userID: ID!
  ) {
    createPost(
      title: $title
      content: $content
      image: $image
      userID: $userID
    ) {
      id
      title
      user {
        username
      }
    }
  }
`;

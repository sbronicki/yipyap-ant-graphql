import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $image: String
    $creator: String!
    $username: String!
  ) {
    createPost(
      title: $title
      content: $content
      image: $image
      creator: $creator
      username: $username
    ) {
      id
    }
  }
`;

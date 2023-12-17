// Start of JS file
import { gql } from '@apollo/client';
// Define query functions here for GraphQL

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts POST{
        _id
        postText
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        postText
        postAuthor
        createdAt
      }
    }
  }
`;

// End of JS file
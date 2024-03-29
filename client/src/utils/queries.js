// Start of JS file
import { gql } from '@apollo/client';
// Define query functions here for GraphQL

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      logs LOG{
        _id
        logText
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      logs {
        _id
        logText
      }
    }
  }
`;
// query logs($username: String)
export const QUERY_LOGS = gql`
  query getThoughts {
    logs (username: $username) {
      _id
      logText
      logAuthor
      createdAt
    }
  }
`;
// query log($logId: ID!)
export const QUERY_SINGLE_LOG = gql`
  query getSingleThought($logId: ID!) {
    log(logId: $logId) {
      _id
      logText
      logAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
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
      logs {
        _id
        logText
        logAuthor
        createdAt
      }
    }
  }
`;

// End of JS file
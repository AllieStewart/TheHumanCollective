// Start of JS file
// Define mutations (functions) for GraphQL
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LOG = gql`
  mutation addLog($logText: String!, $geolocation: GeolocationInput) {
    addLog(logText: $logText, geolocation: $geolocation) {
      _id
      logText
      logAuthor
      geolocation {
        countryText
        stateText
        cityText
        latitude
        longitude
        placeName
      }
      createdAt
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($logId: ID!, $commentText: String!) {
    addComment(logId: $logId, commentText: $commentText) {
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

export const REMOVE_LOG = gql`
  mutation removeLog($logId: ID!) {
    removeLog(logId: $logId) {
      _id
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($logId: ID!, $commentId: ID!) {
    removeComment(logId: $logId, commentId: $commentId) {
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

export const ADD_GEOLOCATION = gql`
  mutation addGeolocation($countryText: String!, $stateText: String, $cityText: String!, $latitude: Float!, $longitude: Float!, $placeName: String) {
    addGeolocation(countryText: $countryText, stateText: $stateText, cityText: $cityText, latitude: $latitude, longitude: $longitude, placeName: $placeName) {
      _id
      countryText
      stateText
      cityText
      latitude
      longitude
      placeName
      createdAt
    }
  }
`;

/* export const SEARCH_HISTORY = gql`
  mutation searchHistory() {
    searchHistory(){

    }
  } */
//`;
// End of JS file
// Start of JS file
// Define query functions here for GraphQL
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      logs {
        _id
        logText
        geolocation {
          countryText
          stateText
          cityText
          latitude
          longitude
          placeName
        }
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
        geolocation {
          countryText
          stateText
          cityText
          latitude
          longitude
          placeName
        }
      }
    }
  }
`;

export const QUERY_LOGS = gql`
  query getLogs($username: String) {
    logs(username: $username) {
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
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_LOG = gql`
  query getSingleLog($logId: ID!) {
    log(logId: $logId) {
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
        geolocation {
          countryText
          stateText
          cityText
          latitude
          longitude
          placeName
        }
        createdAt
      }
    }
  }
`;

export const QUERY_GEOLOCATIONS = gql`
  query getGeolocations {
    geolocations {
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

export const QUERY_SINGLE_GEOLOCATION = gql`
  query getSingleGeolocation($geoId: ID!) {
    geolocation(geoId: $geoId) {
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

// End of JS file
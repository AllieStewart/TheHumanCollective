// Start of JS file
// Model, Auth, Query, and Mutation definitions here.
const typeDefs = `
  # Model type definitions
  type User {
    _id: ID
    username: String
    email: String
    password: String
    logs: [Log]!
  }

  # Geolocation type for storing location data
  type Geolocation {
    _id: ID
    countryText: String
    stateText: String
    cityText: String
    latitude: Float
    longitude: Float
    placeName: String
    createdAt: String
  }

  # Embedded geolocation type for logs
  type LogGeolocation {
    countryText: String
    stateText: String
    cityText: String
    latitude: Float
    longitude: Float
    placeName: String
  }

  # Log type for retrieving log data
  type Log {
    _id: ID
    logText: String
    logAuthor: String
    geolocation: LogGeolocation
    createdAt: String
    comments: [Comment]!
  }

  # Comment type for retrieving comments for logs
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  # Authentication
  type Auth {
    token: ID!
    user: User
  }

  # Input types for mutations
  input GeolocationInput {
    countryText: String
    stateText: String
    cityText: String
    latitude: Float
    longitude: Float
    placeName: String
  }

  # Query type
  type Query {
    users: [User]
    user(username: String!): User
    logs(username: String): [Log]
    log(logId: ID!): Log
    geolocations: [Geolocation]
    geolocation(geoId: ID!): Geolocation
    me: User
  }

  # Mutation type
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addLog(logText: String!, geolocation: GeolocationInput): Log
    addComment(logId: ID!, commentText: String!): Log
    addGeolocation(countryText: String!, stateText: String, cityText: String!, latitude: Float!, longitude: Float!, placeName: String): Geolocation
    removeLog(logId: ID!): Log
    removeComment(logId: ID!, commentId: ID!): Log 
  }
`;
//searchHistory(): for Mutation

module.exports = typeDefs;
// End of JS file
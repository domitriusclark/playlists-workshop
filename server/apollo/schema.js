const { gql } = require("apollo-server");

const typeDefs = gql`
  type LoginResponse {
    token: String
    user: User
  }

  type SuccessMessage {
    message: String
  }

  type Media {
    id: ID!
    title: String
    year: String
    rated: String
    released: String
    runtime: String
    genre: String
    director: String
    writer: String
    actors: String
    plot: String
    language: String
    country: String
    awards: String
    poster: String
    source: String
    value: String
    metascore: String
    imdbRating: String
    imdbVotes: String
    imdbID: String
    totalSeasons: String
    response: String
  }

  type Playlist {
    owner: User!
    id: ID!
    title: String!
    media: [Media]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    playlists: [Playlist]
  }

  type Query {
    currentUser: User!
  }
  
  type Mutation {
	  ## Playlist Mutations
    # createPlaylist(): Playlist
    # deletePlaylist(): SuccessMessage
    ## User Mutations
    register(username: String!, password: String!, email: String!): User!
    login(username: String, email: String, password: String!): LoginResponse!
    logout: SuccessMessage
  }
`;

module.exports = typeDefs;
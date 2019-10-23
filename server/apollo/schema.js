const { gql } = require("apollo-server");

const typeDefs = gql`
  input MediaInput {
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

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    playlists: [Playlist]
  }

  type LoginResponse {
    token: String
    user: User
  }

  type SuccessMessage {
    message: String
  }

  type Playlist {
    owner: User!
    id: ID!
    title: String!
    media: [Media]!
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

  type Query {
    currentUser: User!
    showOrMovieData(title: String): Media!
  }

  type Mutation {
    ## User Mutations
    register(username: String!, password: String!, email: String!): User!
    login(username: String, email: String, password: String!): LoginResponse!
    logout: SuccessMessage

    ## Playlist Mutations
    createPlaylist(userId: ID!, media: MediaInput, title: String!): Playlist
    deletePlaylist(playlistId: ID!, userId: ID!): SuccessMessage

    ## Media Mutations
    createMedia(media: MediaInput!, mediaTitle: String!): Media!
    addMediaToPlaylist(
      playlistTitle: String!
      mediaId: ID!
      mediaTitle: String!
    ): Playlist!
  }
`;

module.exports = typeDefs;

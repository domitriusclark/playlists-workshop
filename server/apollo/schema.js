const { gql } = require("apollo-server");

const typeDefs = gql`
  ## We will need to create two custom types to handle the responses we want from 
  ## a successful logout or login
  type LoginResponse {}

  type SuccessMessage {}

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

  ## Here we will add our mutation type and define the mutation we will be using to invoke the resolvers we defined
  type Mutation {
    register(): User!
    login(): LoginResponse
  }
`;

module.export = typeDefs;
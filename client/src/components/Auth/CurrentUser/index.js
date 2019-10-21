import gql from "graphql-tag";

const CURRENT_USER = gql`
  query {
    currentUser {
      username
      id
      playlists {
        id
        title
        media {
          title
          imdbRating
        }
      }
    }
  }
`;

export default CURRENT_USER;
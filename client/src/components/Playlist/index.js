import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import CURRENT_USER from "../Auth/CurrentUser/index";

const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($userId: ID!, $playlistId: ID!) {
    deletePlaylist(userId: $userId, playlistId: $playlistId) {
      message
    }
  }
`;

const Playlist = ({ playlist, userId }) => {
  const [deletePlaylist] = useMutation(DELETE_PLAYLIST, {
    refetchQueries: () => [{ query: CURRENT_USER, variables: {} }]
  });

  return (
    <div>
      <h1>{playlist.title}</h1>
      <ul>
        {playlist.media.map(m => <li key={m.id}>{m.title}</li>)}
      </ul>
      <button
        onClick={() =>
          deletePlaylist({
            variables: {
              userId: userId,
              playlistId: playlist.id
            }
          })
        }
      >
        Delete
      </button>
    </div>
  );
};



export default Playlist;

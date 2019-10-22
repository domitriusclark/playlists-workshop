import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CURRENT_USER from "../Auth/CurrentUser";

const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($userId: ID!, $title: String!) {
    createPlaylist(userId: $userId, title: $title) {
      title
      id
    }
  }
`;

const PlaylistForm = () => {
  const [playlist, setPlaylist] = React.useState({
    title: ""
  });

  const inputRef = React.useRef();
  const { data } = useQuery(CURRENT_USER);
  const [createPlaylist] = useMutation(CREATE_PLAYLIST, {
    refetchQueries: () => [{ query: CURRENT_USER, variables: {} }]
  });
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createPlaylist({
            variables: {
              title: playlist.title,
              userId: data.currentUser.id
            }
          });
          inputRef.current.value = "";
        }}
      >
        <div>
          <input
            onChange={e => setPlaylist({ ...playlist, title: e.target.value })}
            ref={inputRef}
          />
          <button> + </button>
        </div>
      </form>
    </div>

  );
};

export default PlaylistForm;
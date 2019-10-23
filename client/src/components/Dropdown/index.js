import React from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';

import gql from "graphql-tag";
import CURRENT_USER from "../Auth/CurrentUser";

const CREATE_MEDIA = gql`
  mutation CreateMedia($media: MediaInput!, $mediaTitle: String!) {
    createMedia(media: $media, mediaTitle: $mediaTitle) {
      id
      title
    }
  }
`;

const ADD_MEDIA_TO_PLAYLIST = gql`
  mutation AddMediaToPlaylist(
    $playlistTitle: String!
    $mediaId: ID!
    $mediaTitle: String!
  ) {
    addMediaToPlaylist(
      playlistTitle: $playlistTitle
      mediaId: $mediaId
      mediaTitle: $mediaTitle
    ) {
      media {
        title
      }
    }
  }
`;

const Dropdown = ({ mediaData }) => {
  const { data: userData } = useQuery(CURRENT_USER);

  const defaultDropdownValue = userData.currentUser.playlists.length > 0 ? userData.currentUser.playlists[0].title : "";

  const [dropdownValue, setDropDownValue] = React.useState(defaultDropdownValue);

  const [addMediaToPlaylist] = useMutation(ADD_MEDIA_TO_PLAYLIST, {
    refetchQueries: () => [{ query: CURRENT_USER, variables: {} }]
  });

  const [createMedia] = useMutation(CREATE_MEDIA, {
    onCompleted: data => {
      const mediaId = data.createMedia.id;
      const mediaTitle = data.createMedia.title;

      return addMediaToPlaylist({
        variables: {
          playlistTitle: dropdownValue,
          mediaId,
          mediaTitle
        }
      });
    }
  });

  const createAndAddMedia = media => {
    /*
 
    Since we're going to pull the media in from our RESTDatasource, the type created in our
    source is going to attach a __typename. We need to strip that key off so Prisma can tack it on
    when it runs createMedia()
 
    */
    media = Object.keys(media).reduce((obj, key) => {
      if (key !== "__typename") {
        obj[key] = media[key];
      }

      return obj;
    }, {});

    return createMedia({
      variables: {
        media: {
          ...media
        },
        mediaTitle: media.title
      }
    });
  };
  return (
    <div>
      <select value={dropdownValue} onChange={e => setDropDownValue(e.target.value)}>
        {userData &&
          userData.currentUser.playlists.map(playlist => {
            return (
              <option key={playlist.id} value={playlist.title}>
                {playlist.title}
              </option>
            );
          })}

      </select>
      <button
        onClick={() => createAndAddMedia(mediaData.showOrMovieData)}
      >
        +
            </button>
    </div>
  )
};

export default Dropdown;
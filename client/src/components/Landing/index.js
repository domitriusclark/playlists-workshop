import React from 'react';
import LogoutButton from '../Auth/LogoutButton';
import Playlist from '../Playlist';
import SearchMedia from '../SearchMedia';
import MediaCard from '../MediaCard';

const Playlists = ({ currentUser }) => {
  return currentUser ?
    currentUser.playlists.map(playlist => (
      <Playlist key={playlist.id} userId={currentUser.id} playlist={playlist} />
    )) : null;
}

const Landing = ({ currentUser }) => {
  // We now need to create a way to track our input and feed the title to our RESTDataSource
  // with some state and our two components <SearchMedia /> and <MediaCard />
  return (
    <div>
      <LogoutButton />
      <Playlists currentUser={currentUser} />
    </div>
  )
}

export default Landing;
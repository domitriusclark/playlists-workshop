import React from 'react';
import LogoutButton from '../Auth/LogoutButton';
import Playlist from '../Playlist';

// We need to now render the playlists that get created on our auth'd landing page

const Playlists = () => { };

const Landing = ({ currentUser }) => {
  return (
    <div>
      <LogoutButton />
      <Playlists currentUser={currentUser} />
    </div>
  )
}

export default Landing;
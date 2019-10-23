import React from 'react';
import LogoutButton from '../Auth/LogoutButton';
import Playlist from '../Playlist';
import SearchMedia from '../SearchMedia';
import MediaCard from '../MediaCard';
import PlaylistForm from '../PlaylistForm';

const Playlists = ({ currentUser }) => {
  return currentUser ?
    currentUser.playlists.map(playlist => (
      <Playlist key={playlist.id} userId={currentUser.id} playlist={playlist} />
    )) : null;
}

const Landing = ({ currentUser }) => {
  const [search, setSearch] = React.useState("");
  const [value, setValue] = React.useState("");
  return (
    <div>
      <LogoutButton />
      <div>
        <div>
          <h1>SEARCH YOUR MEDIA</h1>
          <SearchMedia value={value} setSearch={setSearch} setValue={setValue} />
        </div>
        {search && <MediaCard search={search} />}
      </div>
      <PlaylistForm />
      <Playlists currentUser={currentUser} />
    </div>
  )
}

export default Landing;
import React from 'react';
import LogoutButton from '../Auth/LogoutButton';

const Landing = ({ currentUser }) => {
  return (
    <div>
      <LogoutButton />
      <p>Hello {currentUser.username}</p>
    </div>
  )
}

export default Landing;
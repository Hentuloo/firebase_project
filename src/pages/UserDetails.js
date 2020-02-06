import React from 'react';
import { useSelector } from 'react-redux';
import { logout } from 'fb/auth';

const UserDetails = () => {
  const { displayName, photoURL } = useSelector(state => state.user);

  return (
    <div>
      <h2>{displayName}</h2>
      {photoURL && (
        <img
          src={photoURL}
          alt={`avatar użtykownika: ${displayName}`}
        />
      )}
      <button type="button" onClick={logout}>
        Wyloguj się!
      </button>
    </div>
  );
};

export default UserDetails;

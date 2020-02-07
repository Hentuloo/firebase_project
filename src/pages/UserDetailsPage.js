import React from 'react';
import { useSelector } from 'react-redux';
import { logout } from 'fb/auth';
import WithMenuTemplate from 'templates/WithMenuTemplate';

const UserDetailsPage = () => {
  const { displayName, photoURL } = useSelector(state => state.user);

  return (
    <WithMenuTemplate>
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
    </WithMenuTemplate>
  );
};

export default UserDetailsPage;

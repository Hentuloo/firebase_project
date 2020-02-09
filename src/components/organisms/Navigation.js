import React from 'react';
import { Link } from 'react-router-dom';
import { Constants } from 'config/Constants';

export const Navigation = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={Constants.paths.root.path}>
              {Constants.paths.root.name}
            </Link>
          </li>
          <li>
            <Link to={Constants.paths.settings.path}>
              {Constants.paths.settings.name}
            </Link>
          </li>
          <li>
            <Link to={Constants.paths.login.path}>
              {Constants.paths.login.name}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

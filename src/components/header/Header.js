import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import AuthContext from '../context/AuthContext';

/**
 * Header
 *
 * This is the header of our App.
 */

function Header() {
  return (
    <AuthContext.Consumer>
      {context => (
        <>
          <header className="header">
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>

            {context.user.isAuthenticated && (
              <Link to="/login" onClick={() => context.logout()}>
                Log out
              </Link>
            )}

            {!context.user.isAuthenticated && (
              <ul>
                <li>
                  <NavLink activeClassName="active" to="/login">
                    Log in
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/signup">
                    Create account
                  </NavLink>
                </li>
              </ul>
            )}
          </header>
        </>
      )}
    </AuthContext.Consumer>
  );
}

export default Header;

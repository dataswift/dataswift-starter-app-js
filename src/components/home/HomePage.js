import React, { useEffect, useContext } from 'react';
import Dashboard from '../dashboard/Dashboard';
import MyContext from '../context/MyContext';
import { Jwt } from '@dataswift/hat-js/lib/auth/jwt';
import './HomePage.scss';

/**
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route.
 * Checks if the user is authenticated and displays the dashboard in this case.
 */

function HomePage() {
  const mContext = useContext(MyContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      const decodedToken = Jwt.decodeToken(token);
      if (!Jwt.isExpired(decodedToken)) {
        mContext.login(token, decodedToken.iss);
      }
    }
  }, []);

  return (
    <MyContext.Consumer>
      {context => (
        <>
          <div className="home-wrapper">{context.user.isAuthenticated && <Dashboard />}</div>
        </>
      )}
    </MyContext.Consumer>
  );
}

export default HomePage;

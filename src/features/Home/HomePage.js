import React, { useEffect, useContext } from 'react';
import './HomePage.scss';
import { HatTokenValidation } from '@dataswift/hat-js/lib/utils/HatTokenValidation';
import AuthContext from '../../components/context/AuthContext';
import HomePrivate from './HomePrivate';

/**
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route.
 * Checks if the user is authenticated and displays the dashboard in this case.
 */

function HomePage() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      const decodedToken = HatTokenValidation.decodeToken(token);

      if (!HatTokenValidation.isExpired(decodedToken)) {
        authContext.login(token, decodedToken.iss);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Consumer>
      {context => (
        <>
          <div className="home-wrapper">{context.user.isAuthenticated && <HomePrivate />}</div>
        </>
      )}
    </AuthContext.Consumer>
  );
}

export default HomePage;

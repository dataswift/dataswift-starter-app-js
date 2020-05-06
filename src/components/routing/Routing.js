import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../header/Header';
import AuthenticationHandler from '../authentication/AuthenticationHandler';
import HomePage from '../home/HomePage';
import LoginPage from '../authentication/LoginPage';
import RegistrationPage from '../registration/RegistrationPage';

/**
 * Routing
 *
 * This is the routing of our App.
 */

function Routing() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegistrationPage} />
        <Route path="/authentication" component={AuthenticationHandler} />
      </Switch>
    </Router>
  );
}

export default Routing;

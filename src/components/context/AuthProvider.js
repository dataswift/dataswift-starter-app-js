import React, { Component } from 'react';
import AuthContext from './AuthContext';
import { HatTokenValidation } from '@dataswift/hat-js/lib/utils/HatTokenValidation';

/**
 * MyProvider
 *
 * This is a High Order Component for providing a state to child components.
 * In this case we are storing details about the user and functions to handle authentication.
 */

export class AuthProvider extends Component {
  state = {
    user: {
      isAuthenticated: false,
      token: '',
      hatName: '',
    },
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: this.state.user,
          logout: () => {
            sessionStorage.removeItem('token');

            this.setState({
              user: {
                isAuthenticated: false,
                token: '',
                hatName: '',
              },
            });
          },
          login: (token, hatName) => {
            if (token && !HatTokenValidation.isEncodedTokenExpired(token)) {
              this.setState({
                user: {
                  isAuthenticated: true,
                  token: token,
                  hatName: hatName,
                },
              });
            }
          },
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

import React, { Component } from 'react';
import MyContext from './MyContext';

/**
 * MyProvider
 *
 * This is a High Order Component for providing a state to child components.
 * In this case we are storing details about the user and functions to handle authentication.
 */

export class MyProvider extends Component {
  state = {
    user: {
      isAuthenticated: false,
      token: '',
      hatName: '',
    },
  };

  render() {
    return (
      <MyContext.Provider
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
            if (token) {
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
      </MyContext.Provider>
    );
  }
}

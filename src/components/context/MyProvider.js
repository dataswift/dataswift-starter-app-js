import React, {Component} from 'react';
import MyContext from './MyContext';

export class MyProvider extends Component {
    state = {
        user: {
            isAuthenticated: false,
            token: '',
            hatName: ''
        }
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    user: this.state.user,
                    logout: () => {
                        sessionStorage.removeItem("token");

                        this.setState({
                            user: {
                                isAuthenticated: false,
                                token: '',
                                hatName: ''
                            }
                        });
                    },
                    login: (token, hatName) => {
                        if (token) {
                            this.setState({
                                user: {
                                    isAuthenticated: true,
                                    token: token,
                                    hatName: hatName
                                }
                            });
                        }
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

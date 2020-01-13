import React from "react";
import {Link, NavLink} from "react-router-dom";
import "./Header.scss";
import MyContext from "../../context/MyContext";

function Header() {

    return (
        <MyContext.Consumer>
            {context => (
                <>
                    <header className="header">
                        <NavLink exact activeClassName="active" to="/">
                            Home
                        </NavLink>

                        {context.user.isAuthenticated &&

                        <Link to="/login" onClick={ () => context.logout()}>
                            Logout
                        </Link>
                        }

                        {!context.user.isAuthenticated &&
                        <ul>
                            <li>
                                <NavLink activeClassName="active" to="/login">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to="/signup">
                                    Create Account
                                </NavLink>
                            </li>
                        </ul>
                        }
                    </header>
                </>
            )}
        </MyContext.Consumer>
    );
}

export default Header;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "../authentication/Login";
import Header from "../shared/header/Header";
import Home from "../home/Home";
import AuthenticationHandler from "../authentication/AuthenticationHandler";
import Registration from "../registration/Registration";

function Routing() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Registration} />
                <Route path="/authentication" component={AuthenticationHandler} />
            </Switch>
        </Router>
    );
}

export default Routing;

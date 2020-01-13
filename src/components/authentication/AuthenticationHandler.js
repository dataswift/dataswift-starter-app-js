import React, { useEffect } from 'react';
import { getParameterByName } from "../../utils/WindowHelper";
import { useHistory } from 'react-router'

function AuthenticationHandler (props) {
    const history = useHistory();

    useEffect(() => {
        const token = getParameterByName("token");
        const error = getParameterByName("error");

        if (error) {
            history.push("/login");
        }

        if (token) {
            sessionStorage.setItem("token", token);
            history.push("/");
        }
    }, []);

    return (
        <div>Loading...</div>
    );
}

export default AuthenticationHandler;

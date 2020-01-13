import React, { useState } from 'react';
import { appConfig } from "../../app.config";
import {isEmail, isHatName} from "../../utils/validations";

function Registration() {
    const initUser = {
        username: '',
        email: ''
    };

    const [user, setUser] = useState(initUser);
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const errorMessages = {
        usernameNotValid: 'Sorry, this username is not valid',
        emailNotRecognised: 'Sorry, email is not valid',
    };

    const navigateToHatters = () => {
        const redirectUrl = `http://${window.location.host}/authentication`;
        const APP_ID = appConfig.applicationId;

        window.location.href = `https://hatters.dataswift.io/services/baas/signup?email=${user.email}&hat_name=${user.username}&application_id=${APP_ID}&redirect_uri=${redirectUrl}&lang=en`;
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUser({...user, [name]: value});
        setHasError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateSignupDetails();
    };

    const validateSignupDetails = () => {
        let errorMsg = '';

        if (!isHatName(user.username)) {
            errorMsg = errorMessages.usernameNotValid;
        } else if (!isEmail(user.email)) {
            errorMsg = errorMessages.emailNotRecognised;
        } else {
            navigateToHatters();
        }

        if (errorMsg) {
            setErrorMsg(errorMsg);
            setHasError(true);
        }
    };

    return (
        <form onSubmit={e => handleSubmit(e)} className={'flex-column-wrapper flex-content-center flex-align-items-center'}>
            <div className={'flex-spacer-small'}/>

            <h3>Create Account</h3>
            <div className={'flex-spacer-small'}/>

            <input
                className={` ${
                    hasError ? 'input-error-field' : null
                }`}
                name={'username'}
                type={'text'}
                placeholder="Username"
                autoComplete={'username'}
                value={user.username}
                onChange={e => handleChange(e)}
            />
            {hasError && <div className={'input-error-label'}>{errorMsg}</div>}
            <input
                className={` ${
                    hasError ? 'input-error-field' : null
                }`}
                name={'email'}
                type={'text'}
                placeholder="Email"
                autoComplete={'email'}
                value={user.email}
                onChange={e => handleChange(e)}
            />
            {hasError && <div className={'input-error-label'}>{errorMsg}</div>}

            <div className={'flex-spacer-small'}/>

            <button className={'btn btn-accent'} type={'submit'}>Next</button>

            <div className={'flex-spacer-small'}/>
        </form>
    );
}

export default Registration;

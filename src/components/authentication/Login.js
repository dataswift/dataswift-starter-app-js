import React, { useState } from 'react';
import { isEmail, isHatName } from '../../utils/validations';
import { appConfig } from '../../app.config';

function Login() {
  const [username, setUsername] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const errorMessages = {
    usernameNotValid: 'Sorry, this username is not valid',
    emailNotSupported: 'Sorry, email is not supported in this version',
  };

  const redirectValidUser = username => {
    const redirectUrl = `http://${window.location.host}/authentication`;
    const fallback = `http://${window.location.host}/authentication`;
    const APP_ID = appConfig.applicationId;

    window.location.href = `https://${username +
      appConfig.hatCluster}/hatlogin?name=${APP_ID}&redirect=${redirectUrl}&fallback=${fallback}`;
  };

  const handleChange = text => {
    setUsername(text);
    setHasError(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    validateLoginDetails();
  };

  const validateLoginDetails = () => {
    if (isHatName(username)) {
      redirectValidUser(username);
    } else if (isEmail(username)) {
      setErrorMsg(errorMessages.emailNotSupported);
      setHasError(true);
    } else {
      setHasError(true);
      setErrorMsg(errorMessages.usernameNotValid);
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className={'flex-column-wrapper flex-content-center flex-align-items-center'}>
      <div className={'flex-spacer-small'} />

      <h3>Log in</h3>

      <div className={'flex-spacer-small'} />

      <input
        className={` ${hasError ? 'input-error-field' : null}`}
        name={'username'}
        type={'text'}
        placeholder="Username"
        autoComplete={'username'}
        value={username}
        onChange={e => handleChange(e.target.value)}
      />
      {hasError && <div className={'input-error-label'}>{errorMsg}</div>}

      <div className={'flex-spacer-small'} />

      <button className={'btn btn-accent'} type={'submit'}>
        Next
      </button>

      <div className={'flex-spacer-small'} />
    </form>
  );
}

export default Login;

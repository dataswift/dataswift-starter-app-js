import React, { useState } from 'react';
import { HatClient } from '@dataswift/hat-js';
import { isHatName } from '../../utils/validations';
import { appConfig } from '../../app.config';

/**
 * LoginPage
 *
 * This is the Login Page of our App, it is accessible at the '/login' route.
 */

function LoginPage() {
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const errorMessages = {
    usernameNotValid: 'Username is not valid. Try without the domain',
    usernameNotRecognised: 'Username is not recognised. Try without the domain',
  };

  const redirectValidUser = async username => {
    try {
      const hat = new HatClient({});
      const hatDomain = username + appConfig.hatCluster;

      const res = await hat.auth().isDomainRegistered(hatDomain);

      if (res) {
        const hatUrl = `https://${hatDomain}`;
        const redirectUrl = `http://${window.location.host}/authentication`;
        const fallback = `http://${window.location.host}/authentication`;
        const applicationId = appConfig.applicationId;

        window.location.href = hat.auth().generateHatLoginUrl(hatUrl, applicationId, redirectUrl, fallback);
      } else {
        setErrorMsg(errorMessages.usernameNotRecognised);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = event => {
    setUsername(event.target.value);
    setErrorMsg('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    validateLoginDetails();
  };

  const validateLoginDetails = () => {
    if (isHatName(username)) {
      redirectValidUser(username);
    } else {
      setErrorMsg(errorMessages.usernameNotValid);
    }
  };

  return (
    <form className={'flex-column-wrapper flex-content-center flex-align-items-center'} onSubmit={e => handleSubmit(e)}>
      <div className={'flex-spacer-small'} />

      <h3>Log in</h3>

      <div className={'flex-spacer-small'} />

      <input
        className={` ${errorMsg ? 'input-error-field' : null}`}
        name={'123456dev (.hubat.net)'}
        type={'text'}
        placeholder="123456dev (.hubat.net)"
        autoComplete={'username'}
        value={username}
        onChange={e => handleChange(e)}
      />
      {errorMsg && <div className={'input-error-label'}>{errorMsg}</div>}

      <div className={'flex-spacer-large'} />

      <button className={'btn btn-accent'} type={'submit'}>
        Next
      </button>

      <div className={'flex-spacer-small'} />
    </form>
  );
}

export default LoginPage;

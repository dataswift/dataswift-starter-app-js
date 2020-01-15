import React, { useContext, useState } from 'react';
import { HatClient } from '@dataswift/hat-js';
import './Applications.scss';
import { appConfig } from '../../app.config';
import MyContext from '../context/MyContext';

/**
 * Applications
 *
 * This is a function component to fetch and display as a list all the available
 * applications when the user is authenticated.
 */

function Applications() {
  const [apps, setApps] = useState([]);
  const mContext = useContext(MyContext);

  const config = {
    token: mContext.user.token,
    apiVersion: appConfig.hatApiVersion,
    secure: appConfig.secure,
  };
  const hat = new HatClient(config);

  /**
   * Fetches all the available applications and store them in the React state.
   * @returns {Promise<void>}
   */
  const getApps = async () => {
    try {
      const apps = await hat.applications().getAllDefault();

      if (apps.parsedBody) {
        setApps(apps.parsedBody);
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <div className={'flex-column-wrapper flex-content-center flex-align-items-center'}>
      <button className={'btn btn-accent'} onClick={() => getApps()}>
        Fetch applications
      </button>
      <ul className={'application-list'}>
        {apps.map((app, index) => {
          return <li key={index}>{app.application.info.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Applications;

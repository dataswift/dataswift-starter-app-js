import React from 'react';
import './Dashboard.scss';
import Notes from '../notes/Notes';

/**
 * Dashboard
 *
 * This is the Dashboard function component, it is accessible at the '/' route when
 * the user is authenticated.
 */

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        <div className="content">
          <Notes />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

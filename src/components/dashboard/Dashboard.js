import React from 'react';
import Applications from "../applications/Applications";
import "./Dashboard.scss";
import Notes from "../notes/Notes";

function Dashboard() {

    return (
        <div className="dashboard">
            <div className="container">
                <div className="grid sidebar">
                    <Applications />
                </div>
                <div className="grid content">
                    <Notes/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

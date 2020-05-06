import React from 'react';
import './App.css';
import Routing from '../routing/Routing';
import { AuthProvider } from '../context/AuthProvider';

/**
 * App
 *
 * This is the main element of our App.
 * Will be rendered by the ReactDom in the index.js.
 */

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routing />
      </div>
    </AuthProvider>
  );
}

export default App;

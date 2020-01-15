import React from 'react';
import './App.css';
import Routing from '../routing/Routing';
import { MyProvider } from '../context/MyProvider';

/**
 * App
 *
 * This is the main element of our App.
 * Will be rendered by the ReactDom in the index.js.
 */

function App() {
  return (
    <MyProvider>
      <div className="App">
        <Routing />
      </div>
    </MyProvider>
  );
}

export default App;

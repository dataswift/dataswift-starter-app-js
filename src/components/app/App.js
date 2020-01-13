import React from 'react';
import './App.css';
import Routing from "../routing/Routing";
import {MyProvider} from "../context/MyProvider";

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

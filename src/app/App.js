import React from 'react';
import './App.css';
import Routing from './Routing';
import { AuthProvider } from '../components/context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routing />
      </div>
    </AuthProvider>
  );
}

export default App;

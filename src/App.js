import './App.css';
import React, { useState, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import UserContext from './auth/UserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser}}>
        <NavBar />
      </UserContext.Provider>
    </div>
  );
}

export default App;

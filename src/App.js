import './App.css';
import React, { useState, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import UserContext from './auth/UserContext';
import Home from './Home';
import LoginForm from './auth/LoginForm';
import JoblyApi from './auth/LoginForm';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser}}>
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginForm login={JoblyApi.login} />
        </Route>
      </UserContext.Provider>
    </div>
  );
}

export default App;

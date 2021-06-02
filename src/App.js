import './App.css';
import React, { useState, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import UserContext from './auth/UserContext';
import Home from './Home';
import LoginForm from './auth/LoginForm';
import JoblyApi from './api/api';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const TOKEN_KEY = 'jobly-token';
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_KEY);

  const login = async (username, password) => {
    try {
      let token = await JoblyApi.login(username, password);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser}}>
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
      </UserContext.Provider>
    </div>
  );
}

export default App;

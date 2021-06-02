import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import UserContext from './auth/UserContext';
import Home from './Home';
import LoginForm from './auth/LoginForm';
import JoblyApi from './api/api';
import CompanyList from './companies/CompanyList';
import useLocalStorage from './hooks/useLocalStorage';
import jwt from "jsonwebtoken";


function App() {
  const TOKEN_KEY = 'jobly-token';
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_KEY);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          // setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    getCurrentUser();
  }, [token]);

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
        <Route exact path="/companies">
          <CompanyList />
        </Route>
      </UserContext.Provider>
    </div>
  );
}

export default App;

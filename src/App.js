import './App.css';
import React, { useState, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;

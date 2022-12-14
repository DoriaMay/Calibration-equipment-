import React from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Crud  from './components/Crud/Index'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Index' element={<Crud />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

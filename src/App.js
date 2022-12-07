import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { auth } from './firebase';

function App() {

  const [userName, serUserName] = useState("");
  useEffect(()=>{
    
    auth.onAuthStateChanged((user) =>{
      if(user){
        serUserName(user.displayName)
      }else serUserName("");
    });
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/' element={<Home first_name={userName} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

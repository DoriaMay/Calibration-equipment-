import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from './components/firebase';
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css";
import { ToastContainer } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Detail from './pages/Detail';
import AddEditUser from './pages/AddEditUser';
import NotFound from './pages/NotFound';
import ItemDetails from './pages/ItemDetails';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/detail/:id' element={< Detail/>} />
          <Route path='/AddEditUser' element={user?.uid ? <AddEditUser user={user} /> : <Navigate to="/AddEditUser" />} />
          <Route path='/update/:id' element={<AddEditUser />} />
          <Route path='/ItemDetails' element={<ItemDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

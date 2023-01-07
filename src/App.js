import React, { useState, useEffect} from 'react';
import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { auth } from './components/firebase';
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css";
import "./style.scss";
import { ToastContainer } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
// import Detail from './pages/Detail';
import AddEditUser from './pages/AddEditUser';
import NotFound from './pages/NotFound';
import { signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/");
    });
  };

  return (
    <div className="App">
      <Header user={user} handleLogout={handleLogout}/>
      <ToastContainer />
    
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Home' element={<Home user={user}/>} />
          {/* <Route path='/detail/:id' element={< Detail />} /> */}
          <Route path='/AddEditUser' element={user?.uid ? <AddEditUser user={user} /> : <Navigate to="/AddEditUser" />} />
          <Route path='/update/:id' element={<AddEditUser user={user} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
 
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-bootstrap';
import logo from "./img/logo.png";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Home(props) {
  const [user] = useState(auth);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName)
      } else setUserName("");
    });
  }, [])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <NavLink className="navbar-brand" to="/Home">
            <img src={logo} alt="logo" />
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse>
            <Nav className="ms-auto mb-2 my-lg-0 " style={{ maxHeight: '100px' }} >
            <li className="nav-item">
                      <Nav.Link className="nav-link" href="/Index" >Add Itme's</Nav.Link>
                    </li>
             <li className='nav-item'>
                <Nav.Link>{userName}</Nav.Link></li>
              {
                user ?
                  <li className="nav-item">
                    <Nav.Link className="nav-link" href="/"
                      onClick={() => { signOut(auth) }}
                    >Logout</Nav.Link>
                  </li>
                  :
                  <>
                    <li className="nav-item">
                      <Nav.Link className="nav-link" href="/" >Login</Nav.Link>
                    </li>
                    <li className="nav-item">
                      <Nav.Link className="nav-link" href="/Signup" >SignUp</Nav.Link>
                    </li>
                  </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <main>
        <Router>
          <Routes>
            <Route path='/Index' element={<Index />} />
          </Routes>
        </Router>
      </main> */}
    </>
  )
}

export default Home
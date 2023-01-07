import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-bootstrap';
import logo from "../components/img/logo.png";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header({ user, handleLogout }) {
  const userId = user?.uid;


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <NavLink className="navbar-brand" href="/Home" >
            <img src={logo} alt="logo" />
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse>
            <Nav className="ms-auto mb-2 my-lg-0 " style={{ maxHeight: '100px' }} >
              <li className="nav-item nav-link">
                <Nav.Link href="/AddEditUser" >Add Itme's</Nav.Link>
              </li>
                {userId ? (
                  <>
                    <Nav.Link><p style={{marginTop: "8px", marginRight: "4px"}}>{user?.displayName}</p></Nav.Link>
                    <Nav.Link><li className='nav-item nav-link' onClick={handleLogout}>Logout</li></Nav.Link>
                  </>
                ) : (
                  <Nav.Link href='/'>
                    <li className='nav-item nav-link'>Login</li>
                  </Nav.Link>
                  
                )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
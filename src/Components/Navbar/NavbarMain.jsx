import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { myContext } from '../../App';
import { FaSearch } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import { FaUserCircle } from "react-icons/fa";
const NavbarMain = () => {
  const navigate = useNavigate();
  const { login, setLogin, carts, setCarts, signupData, setSignupdata, logindata, setSearchitem, adminloged, setAdminloged, logemail } = useContext(myContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logoutUser = () => {
    setLogin(false);
    const users = signupData.map((data) => {
      if (data.email === logindata) {

        return { ...data, carts: carts }

      } else {
        return data;
      }
    })
    setSignupdata(users)
    setCarts([]);
    setAdminloged(false);
    handleClose();
  }

  return (
    <>

      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand}>
          <Container  >
            <Navbar.Brand className='ls-neg-3' ><Image src={require('../Images/SHOE LOGO.png')} height={'80rem'} onClick={() => navigate('/')} /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  WALK IN STYLE
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 my-3">
                  {
                    adminloged ? <Nav.Link className='' onClick={() => navigate('/admin')}>ADMIN</Nav.Link> : <></>
                  }

                  <Nav.Link className='' onClick={() => navigate('/menproducts')}>MEN</Nav.Link>
                  <Nav.Link onClick={() => navigate('/womenproducts')}>WOMEN</Nav.Link>
                  <Nav.Link onClick={() => navigate('/collection')} >COLLECTION</Nav.Link>


                </Nav>
                <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="my-3"
                    aria-label="Search"
                    onChange={(e) => setSearchitem(e.target.value)}

                  />
                  <Button variant="success " className='my-3 ms-1' onClick={() => navigate('/search')}><FaSearch /></Button>
                </Form>
                <Button className='bg-transparent border-0 text-dark ms-3' onClick={() => navigate('/cart')}><FaShoppingCart style={{ fontSize: '30px' }} /></Button>
                {
                  login ? <Button className='bg-transparent ms-2 border-0  my-3 text-dark d-flex flex-column align-items-center justify-content-center p-2'><FaUserCircle style={{ fontSize: '20px' }} /><span style={{ fontSize: '8px' }}>{logemail}</span></Button> :
                    <></>
                }

                <Button className='bg-transparent ms-2 border-0 text-dark '>
                  {login ? <AiOutlineLogout style={{ fontSize: '30px' }} onClick={handleShow} /> : <FaUser style={{ fontSize: '25px' }} onClick={() => navigate('/login')} />}
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGOUT</Modal.Title>
        </Modal.Header>
        <Modal.Body>ARE YOU SURE?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button variant="primary" onClick={logoutUser}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NavbarMain;



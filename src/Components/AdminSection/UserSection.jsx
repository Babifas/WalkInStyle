import React, { useContext, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { myContext } from '../../App'
import { FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
const UserSection = () => {
  const { signupData, setSignupdata, adminloged } = useContext(myContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userid, setUserid] = useState("")
  const deleteHandle = () => {
    const deleteUser = signupData.filter((data) => data.id !== userid);
    setSignupdata(deleteUser);
    setShow(false);
  }
  const handleClick = (id) => {
    setUserid(id)
    handleShow();
  }
  return (
    <>
      {
        adminloged ? <Container className=' mt-5 '>
          {signupData.map((data) => (
            data.previlage === 'User' ? <div className='mx-3 bg-white d-flex justify-content-between ' style={{ borderBottom: "1px solid black" }} >
              <div onClick={() => navigate(`/usersection/${data.id}`)} style={{ height: '50px', display: 'flex', alignItems: 'center' }} ><FaUserCircle style={{ fontSize: '25px' }} className='mx-3' />
                <p className=' mb-0'>{data.email}</p></div>
              <MdDelete onClick={() => handleClick(data.id)} style={{ fontSize: '25px', minWidth: '25px' }} className='align-self-center me-4' />
            </div> : <></>
          )
          )}

        </Container> : <h1 style={{ color: 'yellowgreen', marginTop: '50px' }}>ACCESS DENIED !!!</h1>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>ARE YOU SURE?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button variant="primary" onClick={deleteHandle}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserSection
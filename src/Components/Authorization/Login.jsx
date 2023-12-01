import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { myContext } from '../../App';
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const navigate = useNavigate();
  const { signupData, setLogin, login, setLogindata, setCarts, logemail, setLogemail, setAdminloged } = useContext(myContext);
  const clickHandle = () => {

    const chechikgPassword = signupData.find((data) => data.password === logpassword && data.email === logemail)

    if (chechikgPassword) {
      setLogin(true);
      if (chechikgPassword.carts) {
        setCarts(chechikgPassword.carts)
      }
      if (chechikgPassword.previlage === 'Admin') {

        setAdminloged(true);
        navigate('/admin')
      } else {

        setAdminloged(false);
        navigate('/');
      }

    } else {
      alert('incorrect email or password')
    }

  }


  const [logpassword, setLogpassword] = useState('');
  const emailHandle = (e) => {
    setLogemail(e)
    setLogindata(e)

  }
  const passwordHandle = (e) => {
    setLogpassword(e)
  }

  return (
    <div className='login-main'>
      <Form className='login-form border border-black border-3 ' onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>EMAIL ADDRESS</Form.Label>
          <Form.Control onChange={(e) => emailHandle(e.target.value)}
            type="email" placeholder="Enter your email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='login-label'>PASSWORD</Form.Label>
          <Form.Control onChange={(e) => passwordHandle(e.target.value)} type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            password must be at least 8 characters
          </Form.Text>
        </Form.Group>

        {login ? <Button onClick={() => setLogin(false)} variant="secondary" type="submit" style={{ width: '100%' }} >
          LOGOUT
        </Button> : <Button onClick={clickHandle} variant="secondary" type="submit" style={{ width: '100%' }} >
          LOGIN
        </Button>}


        <Form.Group controlId="formBasicEmail">

          <p className="mt-3">
            New on our platform?
            <Link to='/signup' style={{ textDecoration: 'none' }}> Create an account</Link>
          </p>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login
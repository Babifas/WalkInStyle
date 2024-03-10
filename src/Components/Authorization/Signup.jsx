import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../../App'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Signup = () => {
  const { email, setEmail, password, setPassword } = useContext(myContext);
  const [repassword, setRepassword] = useState('');
  const [username,setUsername]=useState('');

  const navigate = useNavigate();

  const [emailValid, setEmailvalid] = useState(true);
  const emailHandle = (e) => {
    setEmail(e);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailvalid(emailRegex.test(e));
  }
  const passwordHandle = (e) => {
    setPassword(e)
  }
  const usernameHandle=(e)=>{
    setUsername(e);
  }
 
  const  signupHandle = async () => {
    // const emailChecking = signupData.find((data) => data.email === email);  && !emailChecking

    if (emailValid && password === repassword && password.length >= 8 ) {

      try{
        await axios.post('https://localhost:7281/api/User/Register',{ userName:username, userEmail: email, password: password });
        console.log("User registration successful");
      }
      catch(err){
       console.error('Error adding user:', err);
      }
      

      navigate('/login')
    }
    //  else if (emailChecking) {
    //   alert('email is already exist')
    // }
    else if (emailValid === false && email.length === 0) {
      alert('email is not valid')
    }
    else if (password.length <= 8) {
      alert('Password minimum 8 characters')
    }
    else {
      alert('conformation password is incorrect')
    }

  }
  return (
    <div className='login-main'>
      <Form className='signup-form border border-black border-3 ' onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-3">

<Form.Label>USER NAME</Form.Label>
<Form.Control onChange={(e) => usernameHandle(e.target.value)} type="text" placeholder="Enter your username" />

</Form.Group>
        <Form.Group className="mb-3">

          <Form.Label>EMAIL ADDRESS</Form.Label>
          <Form.Control onChange={(e) => emailHandle(e.target.value)} type="email" placeholder="Enter your email" />

        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label className='login-label'>PASSWORD</Form.Label>
          <Form.Control onChange={(e) => passwordHandle(e.target.value)} type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            password must be at least 8 characters
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label className='login-label'>CONFORM PASSWORD</Form.Label>
          <Form.Control onChange={(e) => setRepassword(e.target.value)} type="password" placeholder="Conform password" />
        </Form.Group>

        <Button onClick={() => signupHandle()} variant="secondary" type="submit" style={{ width: '100%' }}>
          SIGNUP
        </Button>
        <p className="mt-3">
          Already have an account?
          <Link to='/login' style={{ textDecoration: 'none' }}> Login</Link>
        </p>

      </Form>

    </div>
  )
}

export default Signup
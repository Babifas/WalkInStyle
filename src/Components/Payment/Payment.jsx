import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { myContext } from '../../App';
const Payment = () => {
  const { totalPrice, logemail, signupData, setSignupdata, carts } = useContext(myContext);
  const buyedProduct = () => {
    const setdata = signupData.map((data) => {
      if (data.email === logemail) {
        return { ...data, purchasedProduct: carts }
      } else {
        return data;
      }
    })
    setSignupdata(setdata)
    alert('product ordered successfully')

  }
  return (
    <>
      <div className='login-main'>
        <Form style={{ width: '500px' }} className='login-form ' onSubmit={(e) => e.preventDefault()}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>EMAIL ADDRESS</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />

          </Form.Group>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label >CARD HOLDER</Form.Label>
            <Form.Control type="text" placeholder="Card holder name" />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>CARD DETAILS</Form.Label>
            <Form.Control type="number" placeholder="Card number" />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label >ADDRESS</Form.Label>
            <Form.Control type="text" placeholder="address" />
          </Form.Group>
          <Button variant="dark" type="submit" style={{ width: '100%' }} onClick={buyedProduct}>
            PAY  ${totalPrice}.00
          </Button>
        </Form>
      </div>

    </>
  )
}

export default Payment
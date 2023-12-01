import React, { useContext, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const productname = useRef(null);
  const price = useRef(null);
  const gender = useRef(null);
  const about = useRef(null);
  const { products, setProducts, adminloged } = useContext(myContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  const addproduct = () => {

    if (productname.current.value.length === 0 || price.current.value.length === 0 || gender.current.value.length === 0 || about.current.value.length === 0 || !selectedImage) {
      alert('Please complete all required fields before adding the product.');
    } else {
      setProducts([...products, {
        id: products.length + 1,
        img: selectedImage,
        title: productname.current.value,
        prevPrice: `$${price.current.value}`,
        newPrice: price.current.value,
        gender: gender.current.value,
        about: about.current.value
      }])
      navigate('/productsection')
    }

  }
  return (
    <>
      {
        adminloged ? <div className='login-main' style={{ marginTop: '20px' }} >

          <Form className='signup-form border border-black border-3 bg-secondary' onSubmit={(e) => e.preventDefault()}>

            <Form.Group className="mb-3">

              <Form.Label>PRODUCT NAME</Form.Label>
              <Form.Control ref={productname} type="text" placeholder="product name" />

            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label className='login-label'>PRICE</Form.Label>
              <Form.Control ref={price} type="number" placeholder="price" />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className='login-label'>GENDER</Form.Label>
              <Form.Control ref={gender} type="textarea" placeholder="gender" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>ABOUT</Form.Label>
              <Form.Control ref={about} as="textarea" rows={2} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>UPLOAD IMAGE</Form.Label>
              <Form.Control onChange={handleImageChange} type="file" accept="image/*" />

            </Form.Group>
            <Button variant="success" className='mb-3' type="submit" style={{ width: '100%' }} onClick={addproduct}>
              ADD PRODUCT
            </Button>
          </Form>

        </div> :
          <h1 style={{ color: 'yellowgreen', marginTop: '50px' }}>ACCESS DENIED !!!</h1>
      }
    </>

  )
}

export default AddProduct
import React, { useContext, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddProduct = () => {
  // const productname = useRef(null);
  // const orginalprice = useRef(null);
  // const offerprice = useRef(null);
  // const categoryId = useRef(null);
  // const about = useRef(null);
  // const brand=useRef(null);
  // const stock=useRef(null);
  const [productname,setProductName] = useState('');
  const [orginalprice,setorginalprice] = useState(0);
  const [offerprice,setofferprice] = useState(0);
  const [categoryId,setcategoryId] = useState(0);
  const [about,setabout] = useState('');
  const [brand,setbrand]=useState('');
  const [stock,setstock]=useState(0);
  const {token, adminloged } = useContext(myContext);
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };
  const addProduct =async () => {
      try{
        const formData=new FormData();
        formData.append('ProductName',productname);
        formData.append('OrginalPrice',orginalprice);
        formData.append('OfferPrice',offerprice);
     
        formData.append('Description',about);
        formData.append('Brand',brand);
        formData.append('CategoryId',categoryId);
        formData.append('Stock',stock);
        formData.append('image',productImage)
        await axios.post('https://localhost:7281/api/Product',formData,
        {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      navigate('/productsection')
      }
      catch(err){
        console.log(`errror: ${err}`);
      }
    }

  //}
  return (
    <>
      {
        adminloged ? <div className='login-main' style={{ marginTop: '20px' }} >

          <Form className='signup-form border border-black border-3 bg-secondary' onSubmit={(e) => e.preventDefault()}>

            <Form.Group className="mb-3">

              <Form.Label>PRODUCT NAME</Form.Label>
              <Form.Control type="text" placeholder="product name" onChange={(e)=>setProductName(e.target.value)}/>

            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label className='login-label'>ORGINAL PRICE</Form.Label>
              <Form.Control type="number" placeholder="price" onChange={(e)=>setorginalprice(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className='login-label'>OFFER PRICE</Form.Label>
              <Form.Control type="number" placeholder="price" onChange={(e)=>setofferprice(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className='login-label'>CATEGORY ID</Form.Label>
              <Form.Control type="number" placeholder="category id" onChange={(e)=>setcategoryId(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>ABOUT</Form.Label>
              <Form.Control  as="textarea" rows={2} onChange={(e)=>setabout(e.target.value)}/>
            </Form.Group>
         
            <Form.Group className="mb-3" >
              <Form.Label className='login-label'>BRAND</Form.Label>
              <Form.Control type="text" placeholder="brand" onChange={(e)=>setbrand(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className='login-label'>STOCK</Form.Label>
              <Form.Control type="number" placeholder="stock" onChange={(e)=>setstock(e.target.value)}/>
            </Form.Group>
          
            <Form.Group className="mb-3">
              <Form.Label>UPLOAD IMAGE</Form.Label>
              <Form.Control onChange={handleImageChange} type="file" accept="image/*" />

            </Form.Group>
            <Button variant="success" className='mb-3' type="submit" style={{ width: '100%' }} onClick={addProduct}>
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
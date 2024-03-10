import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { myContext } from '../../App';
import { Container, Form, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
  const { token, adminloged } = useContext(myContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product ,setproduct]=useState({});

  const [productname,setProductName] = useState('');
  const [orginalprice,setorginalprice] = useState(0);
  const [offerprice,setofferprice] = useState(0);
  const [categoryId,setcategoryId] = useState(0);
  const [about,setabout] = useState('');
  const [brand,setbrand]=useState('');
  const [stock,setstock]=useState(0);
  const [productImage, setProductImage] = useState(null);

  const FindProduct=async ()=>{
    try{
      const res=await axios.get(`https://localhost:7281/api/Product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }});
        setproduct(res.data);
         setProductImage(res.data.image)
        console.log(res.data.image);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    FindProduct();
  },[])
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };
  const UpdateProduct =async () => {
    console.log(id);
    try{
        const formData=new FormData();
        formData.append('ProductName',productname ||product.productName);
        formData.append('OrginalPrice',orginalprice||product.orginalPrice);
        formData.append('OfferPrice',offerprice||product.offerPrice);
     
        formData.append('Description',about||product.description);
        formData.append('Brand',brand||product.brand);
        formData.append('CategoryId',categoryId||product.categoryId);
        formData.append('Stock',stock||product.stock);
        formData.append('image',productImage)   
      await axios.put(`https://localhost:7281/api/Product/${id}`,formData,
      {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log('successfull');
    navigate('/productsection');
    }
    catch(err){
      console.log(`errror: ${err}`);
    }
  }
  // const productname = useRef(null);
  // const price = useRef(null);
  // const gender = useRef(null);
  // const about = useRef(null);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const product = products.find((product) => parseInt(id) === product.id);
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  // const updateData = () => {
  //   if (productname.current.value.length === 0 || price.current.value.length === 0 || gender.current.value.length === 0 || about.current.value.length === 0) {
  //     alert('Please complete all required fields before adding the product.');
  //   } else {
  //     const productupdate = products.map((item) => {
  //       if (item.id === product.id) {
  //         return {
  //           id: item.id,
  //           img:  selectedImage || item.img,
  //           title: productname.current.value,
  //           prevPrice: `$${price.current.value}`,
  //           newPrice: price.current.value,
  //           gender: gender.current.value,
  //           about: about.current.value
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //     setProducts(productupdate);
  //     navigate('/productsection')
  //   }
  // }
  // const removeProduct = () => {
  //   const removedItem = products.filter((item) => item.id !== product.id);
  //   setProducts(removedItem);
  //   navigate('/productsection')
  // }
  return (
    <>
      {
        adminloged ? <Container  >
          <div className="row  my-5 mx-3 p-3 product-details d-flex align-items-center">
            <div className='bg-white col-lg-5  border border-3  border-dark' >
              <label htmlFor="uploadimage">
                <Image fluid src={productImage || product.image} style={{ maxHeight: '300px' }} className=' p-5' />
              </label>

              <input onChange={handleImageChange} type="file" accept="image/*" className="input-file"
                id="uploadimage" style={{ textDecoration: "none", display: "none" }} />
              <h5>CHOOSE IMAGE</h5>
            </div>
            {/* <div className='col-lg-7 col-sm-12 mt-5 ' style={{ textAlign: 'start' }}>
              <span className='mb-1 ms-3'  >PRODUCT NAME</span>
              <input type="text" className='mb-4 ms-3' onChange={(e)=>setProductName(e.target.value)}  defaultValue={product.productName} style={{ width: '80%' }} />

              <h5 className='mb-1 ms-3' >ORGINAL PRICE</h5>
              <input type="number" className='mb-4 ms-3' onChange={(e)=>setorginalprice(e.target.value)} defaultValue={product.orginalPrice} style={{ width: '80%' }} />
              <h5 className='mb-1 ms-3' >OFFER PRICE</h5>
              <input type="number" className='mb-4 ms-3' onChange={(e)=>setofferprice(e.target.value)} defaultValue={product.offerPrice} style={{ width: '80%' }} />
              <h5 className='mb-1 ms-3' >CATEGORY ID</h5>
              <input type="number" className='mb-4 ms-3' onChange={(e)=>setcategoryId(e.target.value)} defaultValue={product.categoryId} style={{ width: '80%' }} />
              <h5 className='mb-1 ms-3' >BRAND</h5>
              <input type="text" className='mb-4 ms-3' onChange={(e)=>setbrand(e.target.value)} defaultValue={product.brand} style={{ width: '80%' }} />
              <h5 className='mb-1 ms-3' >ABOUT</h5>
              <input type="text" className='mb-4 ms-3'  onChange={(e)=>setabout(e.target.value)} defaultValue={product.description} style={{ width: '80%' }} />
              <h5 className='mb-1 ms-3' >STOCK</h5>
              <input type="number" className='mb-4 ms-3' onChange={(e)=>setstock(e.target.value)} defaultValue={product.stock} style={{ width: '80%' }} />
              <br />
              <Button variant="primary" className='ms-4  mb-4' onClick={UpdateProduct}>UPDATE PRODUCT</Button>
              <Button variant="danger" className='ms-4  mb-4' >REMOVE PRODUCT</Button>
            </div> */}
              <Form className='signup-form border border-black border-3 bg-secondary' onSubmit={(e) => e.preventDefault()}>

<Form.Group className="mb-3">

  <Form.Label>PRODUCT NAME</Form.Label>
  <Form.Control type="text" placeholder="product name" defaultValue={product.productName} onChange={(e)=>setProductName(e.target.value)}/>

</Form.Group>

<Form.Group className="mb-3" >
  <Form.Label className='login-label'>ORGINAL PRICE</Form.Label>
  <Form.Control type="number" placeholder="price" defaultValue={product.orginalPrice} onChange={(e)=>setorginalprice(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label className='login-label'>OFFER PRICE</Form.Label>
  <Form.Control type="number" placeholder="price" defaultValue={product.offerPrice} onChange={(e)=>setofferprice(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label className='login-label'>CATEGORY ID</Form.Label>
  <Form.Control type="number" placeholder="category id" defaultValue={product.categoryId} onChange={(e)=>setcategoryId(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  <Form.Label>ABOUT</Form.Label>
  <Form.Control  as="textarea" rows={2} defaultValue={product.description} onChange={(e)=>setabout(e.target.value)}/>
</Form.Group>

<Form.Group className="mb-3" >
  <Form.Label className='login-label'>BRAND</Form.Label>
  <Form.Control type="text" placeholder="brand" defaultValue={product.brand} onChange={(e)=>setbrand(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label className='login-label'>STOCK</Form.Label>
  <Form.Control type="number" placeholder="stock" defaultValue={product.stock} onChange={(e)=>setstock(e.target.value)}/>
</Form.Group>

{/* <Form.Group className="mb-3">
  <Form.Label>UPLOAD IMAGE</Form.Label>
  <Form.Control onChange={handleImageChange} type="file" accept="image/*" />
</Form.Group> */}
<Button variant="primary" className='ms-4  mb-4' onClick={UpdateProduct}>UPDATE PRODUCT</Button>
              <Button variant="danger" className='ms-4  mb-4' >REMOVE PRODUCT</Button>
{/* <Button variant="success" className='mb-3' type="submit" style={{ width: '100%' }} onClick={addProduct}>
  ADD PRODUCT
</Button> */}
</Form>
          </div>

        </Container> : <h1 style={{ color: 'yellowgreen', marginTop: '50px' }}>ACCESS DENIED !!!</h1>
      }

    </>
  )
}

export default UpdateProduct
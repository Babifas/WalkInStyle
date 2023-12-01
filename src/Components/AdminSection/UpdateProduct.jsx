import React, { useContext, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { myContext } from '../../App';
import { Container, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { products, setProducts, adminloged } = useContext(myContext);
  const { id } = useParams();
  const navigate = useNavigate();
 
  const productname = useRef(null);
  const price = useRef(null);
  const gender = useRef(null);
  const about = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const product = products.find((product) => parseInt(id) === product.id);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  const updateData = () => {
    if (productname.current.value.length === 0 || price.current.value.length === 0 || gender.current.value.length === 0 || about.current.value.length === 0) {
      alert('Please complete all required fields before adding the product.');
    } else {
      const productupdate = products.map((item) => {
        if (item.id === product.id) {
          return {
            id: item.id,
            img:  selectedImage || item.img,
            title: productname.current.value,
            prevPrice: `$${price.current.value}`,
            newPrice: price.current.value,
            gender: gender.current.value,
            about: about.current.value
          };
        } else {
          return item;
        }
      })
      setProducts(productupdate);
      navigate('/productsection')
    }
  }
  const removeProduct = () => {
    const removedItem = products.filter((item) => item.id !== product.id);
    setProducts(removedItem);
    navigate('/productsection')
  }
  return (
    <>
      {
        adminloged ? <Container  >
          <div className="row  my-5 mx-3 p-3 product-details d-flex align-items-center">
            <div className='bg-white col-lg-5  border border-3  border-dark' >
              <label htmlFor="uploadimage">
                <Image fluid src={selectedImage || product.img} style={{ maxHeight: '300px' }} className=' p-5' />
              </label>

              <input onChange={handleImageChange} type="file" accept="image/*" className="input-file"
                id="uploadimage" style={{ textDecoration: "none", display: "none" }} />
              <h5>CHOOSE IMAGE</h5>
            </div>
            <div className='col-lg-7 col-sm-12 mt-5 ' style={{ textAlign: 'start' }}>
              <span className='mb-1 ms-3'  >PRODUCT NAME</span>
              <input type="text" className='mb-4 ms-3' ref={productname} defaultValue={product.title} style={{ width: '80%' }} />

              <h5 className='mb-1 ms-3' >PRICE</h5>
              <input type="text" className='mb-4 ms-3' ref={price} defaultValue={product.newPrice} style={{ width: '80%' }} />
              <h5 className='mb-1 ms-3' >GENDER</h5>
              <input type="text" className='mb-4 ms-3' ref={gender} defaultValue={product.gender} style={{ width: '80%' }} />
              <h5 className='mb-1 ms-3' >ABOUT</h5>
              <input type="text" className='mb-4 ms-3' ref={about} defaultValue={product.about} style={{ width: '80%' }} />

              <br />
              <Button variant="primary" className='ms-4  mb-4' onClick={updateData}>UPDATE PRODUCT</Button>
              <Button variant="danger" className='ms-4  mb-4' onClick={removeProduct}>REMOVE PRODUCT</Button>
            </div>
          </div>

        </Container> : <h1 style={{ color: 'yellowgreen', marginTop: '50px' }}>ACCESS DENIED !!!</h1>
      }

    </>
  )
}

export default UpdateProduct
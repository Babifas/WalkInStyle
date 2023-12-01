import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { myContext } from '../../App';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../../App.css'
const ProductDetails = () => {
  const { products, carts, setCarts, login } = useContext(myContext);
  const { id } = useParams();

  const product = products.find((product) => parseInt(id) === product.id)

  const AddToCart = () => {
    if (login === false) {
      alert('please login')
    }
    else if (carts.some((cartProduct) => cartProduct.id === product.id)) {
      alert('Product is already in the cart!');
    } else {
      setCarts([...carts, product]);
      alert('Product added successfuly!');
    }
  }
  return (
    <>
      <Container  >
        <div className="row  my-5 mx-3 product-details">
          <div className='bg-white col-lg-5 '>
            <Image fluid src={product.img} className=' p-5' style={{ maxHeight: '350px' }} />
          </div>
          <div className='col-lg-7 col-sm-12 mt-5 ' style={{ textAlign: 'start' }}>
            <h1 className='mb-4 ms-3'>{product.title}</h1>
            <h3 className='mb-3 ms-3'>  {product.prevPrice}</h3>
            <h5 className='mb-3 ms-3'>{product.about}</h5>
            <h3 className='mb-4 ms-3'>Free delivery</h3>
            <Button variant="secondary" className='ms-4  mb-4' onClick={AddToCart}>ADD TO CART</Button>
          </div>
        </div>

      </Container>
    </>
  )
}

export default ProductDetails
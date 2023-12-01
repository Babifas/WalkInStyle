import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products } = useContext(myContext)
  const navigate = useNavigate();

  return (

    <>
      <div className='container'>
        <div className="row">
          {products.map((product) => (

            <div className='col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center '>
              <Card key={product.id} style={{ width: '19rem' }} className='mt-4  border-1 border-dark'>
                <Card.Img variant="top" src={product.img} className='p-4' style={{ height: '11rem' }} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    {product.prevPrice}
                  </Card.Text>
                  <Card.Text>
                    Free delivery
                  </Card.Text>
                  <Button variant="secondary" className='product-button' onClick={() => navigate(`/${product.id}`)}>VIEW PRODECT</Button>
                </Card.Body>
              </Card></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Cart
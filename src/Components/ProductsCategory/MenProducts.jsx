import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { myContext } from '../../App';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const MenCart = () => {
  //const { products } = useContext(myContext)
  //  const menproducts = products.filter((product) => product.gender === 'men');
  const [products, setProducts] = useState([]);
  const menProducts = async () => {
    try {
      var res = await axios.get('https://localhost:7281/api/Product/ProductsByCategory/Men');
      setProducts(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    menProducts();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="row ">
          {products.map((product) => (
            <div className='col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center'>
              <Card key={product.productId} style={{ width: '19rem' }} className='mt-4'>
                <Card.Img variant="top" src={product.image} className='p-4' style={{ height: '11rem' }} />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>
                    <Card.Text>
                      {product.offerPrice}
                    </Card.Text>
                    <Card.Text>
                      Free delivery
                    </Card.Text>
                  </Card.Text>
                  <Button variant="secondary" onClick={() => navigate(`/${product.productId}`)}>VIEW PRODECT</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default MenCart
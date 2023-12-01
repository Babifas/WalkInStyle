import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { myContext } from '../../App';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const MenCart = () => {
  const { products } = useContext(myContext)
  const menproducts = products.filter((product) => product.gender === 'men');
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="row ">
          {menproducts.map((product) => (
            <div className='col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center'>
              <Card key={product.id} style={{ width: '19rem' }} className='mt-4'>
                <Card.Img variant="top" src={product.img} className='p-4' style={{ height: '11rem' }} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <Card.Text>
                      {product.prevPrice}
                    </Card.Text>
                    <Card.Text>
                      Free delivery
                    </Card.Text>
                  </Card.Text>
                  <Button variant="secondary" onClick={() => navigate(`/${product.id}`)}>VIEW PRODECT</Button>
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
import React, { useContext } from 'react'
import { myContext } from '../../App'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Search = () => {
  const { searchitem, products } = useContext(myContext);
  const checkedProducts = products.filter((product) => (product.title).toLowerCase().includes(searchitem.toLowerCase()))
  const navigate = useNavigate();
  return (
    <>{
      checkedProducts.length === 0 ? <h1 className='cream   m-4 d-flex align-items-center justify-content-center' style={{ minHeight: '300px', }}>THIS PRODUCT NOT AVAILABLE</h1> : <Container>
        <div className="row display-flex ">
          {checkedProducts.map((product) => (

            <Card key={product.id} style={{ width: '18rem' }} className='col-lg-3 col-md-4 col-sm-6 m-3'>
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

          ))}
        </div>
      </Container>
    }

    </>
  )
}

export default Search
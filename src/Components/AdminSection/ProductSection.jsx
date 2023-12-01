import React, { useContext, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';

const ProductSection = () => {
  const navigate = useNavigate();
  const { products, adminloged } = useContext(myContext)
  const [items, setItems] = useState(products);
  const men = products.filter((product) => product.gender === 'men')
  const women = products.filter((product) => product.gender === 'women')
  return (
    <> {
      adminloged ? <>  <Container className='d-flex justify-content-around mt-3'>
        <DropdownButton variant='success' id="dropdown-basic-button" title="CATOGARY">
          <Dropdown.Item onClick={() => setItems(men)}>MEN</Dropdown.Item>
          <Dropdown.Item onClick={() => setItems(women)}>WOMEN</Dropdown.Item>
          <Dropdown.Item onClick={() => setItems(products)}>COLLECTION</Dropdown.Item>
        </DropdownButton>
        <Button className='bg-success border-0' onClick={() => navigate('/addproduct')}>ADD PRODUCT</Button>
      </Container>

        <Container >
          <div className="row" >
            {items.map((product) => (
              <div className='col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center '>
                <Card key={product.id} style={{ width: '19rem' }} className='mt-4 border-1 border-dark'>
                  <Card.Img variant="top" src={product.img} className='p-4' style={{ height: '11rem' }} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {product.prevPrice}
                    </Card.Text>
                    <Card.Text>
                      Free delivery
                    </Card.Text>
                    <Button variant="secondary" className='product-button' onClick={() => navigate(`/productsection/${product.id}`)}>VIEW PRODECT</Button>
                  </Card.Body>
                </Card></div>
            ))}
          </div>
        </Container></> : <h1 style={{ color: 'yellowgreen', marginTop: '50px' }}>ACCESS DENIED !!!</h1>
    }

    </>
  )
}

export default ProductSection
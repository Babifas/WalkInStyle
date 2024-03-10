import React, { useContext, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const ProductSection = () => {
  const navigate = useNavigate();
  const { adminloged } = useContext(myContext)

  const [products,setProducts]=useState([]);
  
  const ProductsByCategory=async(category)=>{
    try{
      var res=await axios.get(`https://localhost:7281/api/Product/ProductsByCategory/${category}`)
      setProducts(res.data)
    }
    catch(err){
      console.log(err);
    }
  }
  // const [items, setItems] = useState(products);
  // const men = products.filter((product) => product.gender === 'men')
  // const women = products.filter((product) => product.gender === 'women')
  return (
    <> {
      adminloged ? <>  <Container className='d-flex justify-content-around mt-3'>
        <DropdownButton variant='success' id="dropdown-basic-button" title="CATOGARY">
          <Dropdown.Item onClick={() => ProductsByCategory('Men')}>MEN</Dropdown.Item>
          <Dropdown.Item onClick={() => ProductsByCategory('Women')}>WOMEN</Dropdown.Item>
          <Dropdown.Item >COLLECTION</Dropdown.Item>
        </DropdownButton>
        <Button className='bg-success border-0' onClick={() => navigate('/addproduct')}>ADD PRODUCT</Button>
      </Container>

        <Container >
          <div className="row" >
            {products.map((product) => (
              <div className='col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center '>
                <Card key={product.productId} style={{ width: '19rem' }} className='mt-4 border-1 border-dark'>
                  <Card.Img variant="top" src={product.image} className='p-4' style={{ height: '11rem' }} />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>
                      {product.offerPrice}
                    </Card.Text>
                    <Card.Text>
                      Free delivery
                    </Card.Text>
                    <Button variant="secondary" className='product-button' onClick={() => navigate(`/productsection/${product.productId}`)}>VIEW PRODECT</Button>
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
import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../../App'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Search = () => {
  const { searchitem } = useContext(myContext);
  const[products,setProducts]=useState([]);
  // const checkedProducts = products.filter((product) => (product.title).toLowerCase().includes(searchitem.toLowerCase()))
  const searchProducts=async()=>{
   try{
    var res=await axios.get(`https://localhost:7281/api/Product/SearchProduct?product=${searchitem}`)
    setProducts(res.data)
    console.log(res.data);
   }
   catch(err){
    console.log(err);
   }
  }
  useEffect(()=>{
    searchProducts();
  },[searchitem])
  const navigate = useNavigate();
  return (
    <>{
      products.length === 0 ? <h1 className='cream   m-4 d-flex align-items-center justify-content-center' style={{ minHeight: '300px', }}>THIS PRODUCT NOT AVAILABLE</h1> : <Container>
        <div className="row display-flex ">
          {products.map((product) => (

            <Card key={product.productId} style={{ width: '18rem' }} className='col-lg-3 col-md-4 col-sm-6 m-3'>
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

          ))}
        </div>
      </Container>
    }

    </>
  )
}

export default Search
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [data, setData] = useState([]);

  var fetchProducts = async () => {
    try {
      const res = await axios.get('https://localhost:7281/api/Product/GetAllProducts');
      setData(res.data)
      // console.log(data);
    } catch (err) {
      console.log(`An error occurred: ${err}`);
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  // useEffect(()=>{
  //   const apiUrl='https://localhost:7281/api/Product/GetAllProducts';
  //   axios.get(apiUrl)
  //     .then(res=>{
  //       setData(res.data);
  //     })
  //     .catch(err=>{console.log(`An error occurred: ${err}`)})
  // },[]);
  const { products } = useContext(myContext)
  const navigate = useNavigate();

  return (

    <>
      <div className='container'>
        <div className="row ">
          {data.map((product) => (

            <div className='col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center '>
              <Card key={product.productId} style={{ width: '210px' }} className='mt-4  border-1 border-dark'>
                <Card.Img variant="top" src={product.image} className='p-3' style={{ height: '280px' }} />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>
                    {product.prevPrice}
                  </Card.Text>
                  <Card.Text>
                    Free delivery
                  </Card.Text>
                  <Button variant="secondary" className='product-button' onClick={() => navigate(`/${product.productId}`)}>VIEW PRODECT</Button>
                </Card.Body>
              </Card></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Cart
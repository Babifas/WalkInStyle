import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
const Cart = () => {
  const { carts, setCarts, totalPrice, setTotalprice } = useContext(myContext)

  const navigate = useNavigate();
  const quantityHandle = (cartId, e) => {
    const quntityChange = carts.map((cart) => cart.id === cartId && cart.quantity + e > 0 ? { ...cart, quantity: cart.quantity + e, total: (cart.quantity) * (cart.newPrice) } : { ...cart })
    setCarts(quntityChange)
  }

  useEffect(() => {

    const total = carts.reduce((sum, cart) => sum + cart.quantity * cart.newPrice, 0);
    setTotalprice(total);
  }, [carts, setTotalprice])
  const removeCart = (id) => {
    const removeItem = carts.filter((cart) => cart.id !== id);
    setCarts(removeItem)
  }
  return (
    <>
      <h1 className='m-4 text-secondary' style={{ fontSize: '80px', letterSpacing: '2px' }}>CART</h1>
      <Container >

        {carts.length === 0 ? <h1 className='cream  p-4 mb-4 d-flex align-items-center justify-content-center' style={{ minHeight: '300px', }}>CART IS EMPTY</h1> : <>{carts.map((cart) => (
          <div className="row bg-white  p-1 mx-3 mb-5" key={cart.id}>
            <div className=" col-lg-5 col-sm-12 my-2 " >
              <Image fluid src={cart.img} className='p-4 col-12' />
              <Button className=' bg-transparent text-dark border-dark' onClick={() => quantityHandle(cart.id, -1)}>-</Button>
              <Button className='m-3  bg-success text-white border-dark'>QUANTITY:{cart.quantity}</Button>
              <Button className=' bg-transparent text-dark border-dark' onClick={() => quantityHandle(cart.id, 1)}>+</Button>
            </div>
            <div className='col-lg-7 col-sm-12 py-3 cream '>

              <h1 className='pb-3 pt-4'>{cart.title}</h1>
              <h3 className='pb-2'>Price:{cart.newPrice}</h3>
              <h3 className='pb-3'>Quantity:{cart.quantity}</h3>
              <h1>TOTAL:{(cart.quantity) * (cart.newPrice)}</h1>
              <Button onClick={() => removeCart(cart.id)}>REMOVE</Button>
            </div>
          </div>
        ))}
          <div className='cream  p-4 mb-4'>
            <h1>TOTAL PRICE:{totalPrice}</h1>
            <Button className='bg-success border-black' onClick={() => navigate('/payment')}>CHECKOUT</Button>
          </div>
        </>}
      </Container>

    </>
  )
}

export default Cart
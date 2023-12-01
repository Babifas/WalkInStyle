import React, { useContext } from 'react'
import { Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { myContext } from '../../App';

const Admin = () => {
  const navigate = useNavigate();
  const { adminloged } = useContext(myContext);
  return (
    <>
      {
        adminloged ? <div className='container d-flex justify-content-around align-items-center  mt-5 ' style={{ height: '500px', backgroundColor: 'grey' }}>
          <div onClick={() => navigate('/usersection')} className='p-3' style={{ width: '200px', backgroundColor: 'beige' }}>
            <Image fluid src={require('../Images/users.png')} style={{ width: '100px' }} />
            <h2 className='pt-3'>USERS</h2>
          </div>
          <div onClick={() => navigate('/productsection')} className=' p-3 ' style={{ width: '200px', backgroundColor: 'beige' }}>
            <Image fluid src={require('../Images/product.png')} style={{ width: '100px' }} />
            <h2 className='pt-3'>PRODUCTS</h2>
          </div>
        </div> :
          <h1 style={{ color: 'yellowgreen', marginTop: '50px' }}>ACCESS DENIED !!!</h1>
      }

    </>
  )
}

export default Admin
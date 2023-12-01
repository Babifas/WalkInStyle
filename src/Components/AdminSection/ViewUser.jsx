import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import { myContext } from '../../App';
import { useParams } from 'react-router-dom';
const ViewUser = () => {
  const { signupData, adminloged } = useContext(myContext);
  const { id } = useParams();

  const findUser = signupData.find((data) => data.id === parseInt(id));
  console.log(findUser);
  let orderedItems;
  if (findUser.purchasedProduct) {
    orderedItems = findUser.purchasedProduct;
  } else {
    orderedItems = [];
  }

  return (
    <>

      {adminloged ? <Container>
        {
          <div className='d-flex flex-column align-items-center bg-white mt-5'>
            <Image src={require('../Images/users.png')} roundedCircle className='bg-secondary my-3 p-3' style={{ maxWidth: '150px' }} />
            <h5>{findUser.email}</h5>
            <p>ID:{findUser.id}</p>

          </div>

        }

        <h1 style={{ backgroundColor: 'yellowgreen' }}>ORDER LIST</h1>
        <div className='table-responsive'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCT NAME</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            {orderedItems.length === 0 ? <tr className='bg-white'><td colSpan={5}>NO ITEM ORDERED</td></tr> : orderedItems.map((item) => (
              <tbody>  <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.newPrice}</td>
                <td>{item.quantity}</td>
                <td>{item.newPrice * (item.quantity)}</td>
              </tr>

              </tbody>
            ))}

          </Table>
        </div>
      </Container> : <h1 style={{ color: 'yellowgreen', marginTop: '50px' }}>ACCESS DENIED !!!</h1>
      }
    </>
  )
}

export default ViewUser
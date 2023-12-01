import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import '../../App.css'
const Home = () => {

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <Image src={require('../Images/Home1.jpg')} style={{ width: '100%' }} />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={require('../Images/Home22.jpg')} style={{ width: '100%' }} />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={require('../Images/Home3.jpg')} style={{ width: '100%' }} />
        </Carousel.Item>

      </Carousel>

      <Image src={require('../Images/homee.jpg')} style={{ width: '100%' }} />
    </>
  )
}

export default Home



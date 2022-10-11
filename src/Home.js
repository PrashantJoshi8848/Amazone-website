import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
  return (<>
    <div className='home'>
      <img
        src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
        alt='Home-img'
        className='home__image'
      />

   
    {/* Product having Price,title,rating,image,id */}
    <div className='home__row'>
      <Product id="12321341"
        price={11.25}
        title="Gaming Keyboard and Mouse and Mouse pad and Gaming Headset, Wired LED RGB Backlight Bundle for PC Gamers and Xbox and PS4 Users - 4 in 1 Edition Hornet RX-250"
        image="https://m.media-amazon.com/images/I/71OkZ34-9VL._AC_SX425_.jpg"
        rating={5} />
      <Product id="12321341"
        price={451.75}
        title="HP 15-inch Laptop, 11th Generation Intel Core i5-1135G7, Intel Iris Xe Graphics, 8 GB RAM, 256 GB SSD, Windows 11 Home (15-dy2024nr, Natural silver)"
        image="https://m.media-amazon.com/images/I/71RD3vsjIYL._AC_SX679_.jpg"
        rating={4} />


    </div>

    <div className='home__row'>
      <Product id="12321341"
        price={70}
        title="CHAFON RGB Gaming Headset with Mic for Xbox One, PS4, PS5, Over-Ear Headphones with Stereo Surround Sound, Dynamic RGB Light, Memory Foam Earcups, Noise Canceling Mic for PC, Laptop, Phone"
        image="https://m.media-amazon.com/images/I/81GEbdSJdpL._AC_SX425_.jpg"
        rating={5} />
      <Product id="12321341"
        price={15.25}
        title="Baby Wipes, Pampers Sensitive Water Based Baby Diaper Wipes, Hypoallergenic and Unscented, 8 Refill Packs (Tub Not Included), 72 each, Pack of 8 (Packaging May Vary)"
        image="https://m.media-amazon.com/images/I/71VcRPrsScL._SX425_.jpg"
        rating={3} />

      <Product id="12321341"
        price={8.25}
        title="Gaming Keyboard and Mouse and Mouse pad and Gaming Headset, Wired LED RGB Backlight Bundle for PC Gamers and Xbox and PS4 Users - 4 in 1 Edition Hornet RX-250"
        image="https://m.media-amazon.com/images/I/71UMZA1PIVL._AC_SX679_.jpg"
        rating={4} />

    </div>

    <div className='home__row'>
   <Product id="12321341"
    price={11.25}
    title="Zebronics ZEB-A27FHD LED Monitor with 68.5cm (27”) Wide Screen, Full HD 1920x1080, HDMI, VGA, Built in Speaker, 240cd/m² Brightness, 16.7 Million Colors, Ultra Slim Bezel and Wall mountable Design"
    image="https://m.media-amazon.com/images/I/71vNrx05QFL._SX679_.jpg"
    rating={5} />
      </div>
     </div>
  </>
  )
}

export default Home
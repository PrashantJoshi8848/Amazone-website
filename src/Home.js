import React from "react";
import "./Home.css";
import Product from "./Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct } from "./Redux/slice/SingleSlice";

function Home() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const data = [
    { image: "caro2.jpg", alt: "carosel_imag" },
    { image: "caro1.jpg", alt: "carosel_imag" },
    { image: "caro.jpg", alt: "carosel_imag" },
  ];

  const {
    isLoading,
    error,
    data: productdata,
  } = useQuery({
    queryKey: ["Productdata"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/nfts")
        .then((res) => res.json())
        .then((res) => res?.data?.query),
  });

  const dispatch = useDispatch();
  const firstProduct = productdata && productdata?.slice(0, 2);
  const secoundProduct = productdata?.slice(2, 5);
  const lastProduct = productdata?.slice(5, 6);
  return (
    <>
      <div className="home">
        <Carousel
          arrows={true}
          renderDotsOutside={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
          keyBoardControl={false}
          transitionDuration={2500}
          containerClass="carousel-container"
          deviceType={"desktop"}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {data?.map((data, index) => (
            <div key={index}>
              <img src={data.image} alt={data.alt} className="home__image" />
            </div>
          ))}
        </Carousel>

        {/* Product having Price,title,rating,image,id */}
        <div className="home__row">
          {firstProduct?.map((items, index) => (
            <div className="px-1" key={index}>
              <Product
                id={items._id}
                price={items.price}
                title={items.name}
                image={items.imageCover || `noimage.jpg`}
                rating={items.rating}
              />
            </div>
          ))}
          {/* <Product
            id="12321341"
            price={11.25}
            title="Gaming Keyboard and Mouse and Mouse pad and Gaming Headset, Wired LED RGB Backlight Bundle for PC Gamers and Xbox and PS4 Users - 4 in 1 Edition Hornet RX-250"
            image="pic1.jpg"
            rating={5}
          />
          <Product
            id="12321341"
            price={451.75}
            title="HP 15-inch Laptop, 11th Generation Intel Core i5-1135G7, Intel Iris Xe Graphics, 8 GB RAM, 256 GB SSD, Windows 11 Home (15-dy2024nr, Natural silver)"
            image="pic2.jpg"
            rating={4}
          /> */}
        </div>

        <div className="home__row">
          {secoundProduct?.map((items, index) => (
            <React.Fragment key={index}>
              <Product
                id={items._id}
                price={items.price}
                title={items.name}
                image={items.imageCover || "noimage.jpg"}
                rating={items.rating}
              />
            </React.Fragment>
          ))}

          {/* <Product
            id="12321341"
            price={70}
            title="CHAFON RGB Gaming Headset with Mic for Xbox One, PS4, PS5, Over-Ear Headphones with Stereo Surround Sound, Dynamic RGB Light, Memory Foam Earcups, Noise Canceling Mic for PC, Laptop, Phone"
            image="pic3.jpg"
            rating={5}
          />
          <Product
            id="12321341"
            price={15.25}
            title="Baby Wipes, Pampers Sensitive Water Based Baby Diaper Wipes, Hypoallergenic and Unscented, 8 Refill Packs (Tub Not Included), 72 each, Pack of 8 (Packaging May Vary)"
            image="pic4.jpg"
            rating={3}
          />

          <Product
            id="12321341"
            price={8.25}
            title="Gaming Keyboard and Mouse and Mouse pad and Gaming Headset, Wired LED RGB Backlight Bundle for PC Gamers and Xbox and PS4 Users - 4 in 1 Edition Hornet RX-250"
            image="pic5.jpg"
            rating={4}
          /> */}
        </div>

        <div className="home__row">
          {lastProduct?.map((items, index) => (
            <React.Fragment key={index}>
              <Product
                id={items._id}
                price={items.price}
                title={items.name}
                image={items.imageCover}
                rating={items.rating}
              />
            </React.Fragment>
          ))}
          {/* <Product
            id="12321341"
            price={11.25}
            title="Zebronics ZEB-A27FHD LED Monitor with 68.5cm (27”) Wide Screen, Full HD 1920x1080, HDMI, VGA, Built in Speaker, 240cd/m² Brightness, 16.7 Million Colors, Ultra Slim Bezel and Wall mountable Design"
            image="pic6.jpg"
            rating={5}
          /> */}
        </div>
      </div>
    </>
  );
}

export default Home;

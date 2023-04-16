import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket);
  return (
    <>
      <div className="checkout">
        <div className="checkout__left">
          <img src="ads.jpg" alt="ads" className="checkout__ad" />
          <div>
            <h2 className="checkout__title">your shooping Basket</h2>
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="checkout__right">
          <Subtotal />
          {/* <h2>sub total will go here</h2> */}
        </div>
      </div>
    </>
  );
}

export default Checkout;

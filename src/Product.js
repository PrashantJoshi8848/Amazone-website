import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
function Product({ id, price, title, image, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  console.log(`THIS IS THE BASKET ${basket}`);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        price: price,
        title: title,
        image: image,
        rating: rating,
      },
    });
  };
  return (
    <>
      <div className="product">
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="Product__rating">
            {Array(rating)
              .fill()
              .map((_) => (
                <p>⭐</p>
              ))}
          </div>
        </div>
        <img src={image} alt="product" />
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </>
  );
}

export default Product;

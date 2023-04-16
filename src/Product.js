import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
function Product({ id, price, title, image, rating }) {
  const [{ basket }, dispatch] = useStateValue();
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
  const queryClient = useQueryClient();
  return (
    <>
      <div className="product">
        <div className="product__info cursor-pointer hover:text-gray-400">
          <Link to={`/producdetail/${id}`}>
            <p
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: ["SingleProductdata"],
                });
              }}
            >
              {title}
            </p>
          </Link>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="Product__rating">
            {Array(parseInt(rating))
              .fill()
              .map((_, index) => (
                <React.Fragment key={index}>
                  <p>⭐</p>
                </React.Fragment>
              ))}
          </div>
        </div>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${image}` || `"noimage.jpg"`}
          alt="product"
        />
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </>
  );
}

export default Product;

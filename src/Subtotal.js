import React, { useEffect } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  // const { token } = useSelector((utiles) => utiles.Auth);
  let token;
  useEffect(() => {
    token = Cookies.get("access_token");
  }, []);

  const navigate = useNavigate();
  const handelCheckout = () => {
    if (!basket.length) {
      toast.warn("Add item's to cart for checkout");
    }
    if (!token && basket.length) {
      toast.warn("Login to checkout");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              subtotal ({basket.length} items):<strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order conatains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={handelCheckout}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;

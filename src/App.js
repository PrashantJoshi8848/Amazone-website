import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Checkout from "./Checkout";
import Login from "./Login";
import Signup from "./Page/Signup";
import { useSelector, useDispatch } from "react-redux";
import { isAlreadylogin } from "./Redux/slice/AuthSlice";
import Admin from "./Page/Admin";
import PageNotFound from "./Page/PageNotFound";
import ProductDetail from "./Page/ProductDetail";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAlreadylogin());
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/"
            element={
              <>
                <Nav />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Nav />
                <Checkout />
              </>
            }
          />
          <Route path="/producdetail/:id" element={<ProductDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;

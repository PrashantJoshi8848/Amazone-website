import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Checkout from "./Checkout";
import Login from "./Login";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
        </Routes>
      </Router>
    </>
  );
};
export default App;

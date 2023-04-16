import React from "react";
import { useEffect } from "react";
import ClientSignup from "../Component/ClientSignup";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-screen h-screen overflow-hidden bg-white">
      <Nav />
      <ClientSignup />;
    </div>
  );
};

export default Signup;

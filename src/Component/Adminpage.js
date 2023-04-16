import React, { useEffect, useRef, useState } from "react";
import Nav from "../Nav";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "../Validation/ValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const Adminpage = () => {
  return (
    <div className=" h-screen overflow-hidden">
      <Nav />
      <ProductForm />
    </div>
  );
};

export default Adminpage;

const ProductForm = () => {
  const navigate = useNavigate();
  const [getvalue, setValue] = useState({
    Productname: "",
    Categories: "men's clothing",
    Description: "",
    Price: null,
  });

  const [imageFile, setimage] = useState(null);
  const ref = useRef(null);

  const handelChange = (e) => {
    if (e.target.name === "Price") {
      setValue({ ...getvalue, Price: parseInt(e.target.value) });
      return;
    }
    setValue({ ...getvalue, [e.target.name]: e.target.value });
    //    e.target.name=e.target.value
  };
  const { mutate, isLoading, isSuccess, data } = useMutation({
    mutationFn: async (values) => {
      await axios.post("/api/v1/nfts", values);
    },
    onError: (res) => {
      if (res?.response?.data?.Errormessage) {
        toast.error(res?.response?.data?.Errormessage);
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("succesfully added Products");
      setValue({
        Productname: "",
        Categories: "men's clothing",
        Description: "",
        Price: 0,
      });
      setimage(null);
      ref.current.value = "";
    }
  }, [isSuccess]);

  const handelSubmit = () => {
    const formData = new FormData();
    formData.append("name", getvalue.Productname);
    formData.append("categories", getvalue.Categories);
    formData.append("description", getvalue.Description);
    formData.append("price", getvalue.Price);
    if (imageFile !== null) {
      for (let file of imageFile) {
        formData.append(`images`, file);
      }
    }
    if (
      getvalue.Productname &&
      getvalue.Categories &&
      getvalue.Description &&
      getvalue.Price
    ) {
      mutate(formData);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[90%]">
      <div className="w-[50%] h-[100%] flex flex-col justify-center px-10">
        <label className=" py-2">Name</label>
        <input
          onChange={handelChange}
          className=" p-2"
          type="text"
          placeholder="Product Name"
          name="Productname"
          value={getvalue.Productname}
        />
        <label className=" py-2">categories</label>
        <select
          className="p-2"
          name="Categories"
          onChange={handelChange}
          value={getvalue.Categories}
        >
          <option>men's clothing</option>
          <option>jewelery</option>
          <option>electronics</option>
          <option>women's clothing</option>
          <option>toys</option>
          <option>shoes</option>
        </select>
        <label className=" py-2  min-w-full">description</label>
        <textarea
          className=" p-2"
          type="text"
          name="Description"
          placeholder="description of Product..."
          onChange={handelChange}
          value={getvalue.Description}
        />
        <label className=" py-2">price</label>
        <input
          onChange={handelChange}
          className=" p-2"
          type="number"
          placeholder="$00.00"
          name="Price"
          value={getvalue.Price}
        />
        <label className=" py-2">Product images</label>
        <input
          required={true}
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            if (e.target.files[0] !== undefined && e.target.files[0]) {
              setimage(e.target.files);
            }
            if (!e.target.files) return;
          }}
          className=" p-2"
          type="file"
          ref={ref}
        />
        <div className=" mt-5 w-[100%] ">
          <button
            type="submit"
            className="login__signInButton"
            onClick={handelSubmit}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

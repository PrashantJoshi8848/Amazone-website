import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from "../Validation/ValidationSchema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientSignup = () => {
  const [ImageFile, setImageFile] = useState(null);
  const [previewImag, setPreviewImag] = useState("");
  const navigate = useNavigate();

  // Handel register images
  const handelImage = (e) => {
    if (e.target.files[0] !== undefined && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewImag(URL.createObjectURL(e.target.files[0]));
    }
  };

  // handel useQuweries

  const { mutate, isLoading, isSuccess, data } = useMutation({
    mutationFn: async (values) => {
      await axios.post("/api/v1/Auth/register", values);
    },
    onError: (res) => {
      if (res?.response?.data?.Errormessage) {
        toast.error(res?.response?.data?.Errormessage);
      }
    },
  });
  console.log(data);

  // if (isSuccess) {
  //   toast.promise(
  //     new Promise((resolve) => resolve(), {
  //       success: {
  //         render() {
  //           setTimeout(() => navigate("/login"), 3500);
  //           return "Signup Successful!..";
  //         },
  //       },
  //     })
  //   );
  // }
  if (isSuccess) {
    new Promise((resolve) => {
      toast.success("signup Succesful !..");
      return setTimeout(() => {
        navigate("/login");
        resolve("Login in with your email");
      }, 3500);
    }).then((res) => toast.warn(res));
  }

  const handelSubmit = (value) => {
    const { email, password, confirmPassword, firstName } = value;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", firstName);
    formData.append("password", password);
    formData.append("ConfirmPassword", confirmPassword);
    if (ImageFile !== null) {
      formData.append("Avatar", ImageFile);
    }

    mutate(formData);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={handelSubmit}
      enableReinitialize
    >
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="h-[80%] w-[350px] ">
          <div className="w-[100%] flex justify-center items-center mb-8 cursor-pointer">
            <div className="w-[100px] ">
              <img
                className="bg-cover bg-center"
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                }
                alt="logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
          </div>
          <div className="w-full border border-[lightgray] p-[20px] rounded-md">
            <h1 className=" mb-10">Sign-Up</h1>

            <Form className="flex flex-col gap-1">
              <label htmlFor={"firstName"}>FullName</label>
              <Field
                id={"firstName"}
                className=" p-1 bg-[#E8F0FE]"
                placeholder={"FullName"}
                name="firstName"
                type="text"
              />
              <ErrorMessage name="firstName">
                {(errorMsg) => (
                  <div className=" text-rose-600">*{errorMsg}</div>
                )}
              </ErrorMessage>
              <label htmlFor={"email"}>Email</label>
              <Field
                id={"email"}
                className=" p-1 bg-[#E8F0FE]"
                placeholder={"john@gmail.com  "}
                name="email"
                type="email"
              />
              <ErrorMessage name="email">
                {(errorMsg) => (
                  <div className=" text-rose-600">*{errorMsg}</div>
                )}
              </ErrorMessage>
              <label htmlFor={"email"}>Password</label>
              <Field
                id={"password"}
                className=" p-1 bg-[#E8F0FE]"
                placeholder={"Password"}
                name="password"
                type="password"
              />
              <ErrorMessage name="password">
                {(errorMsg) => (
                  <div className=" text-rose-600">*{errorMsg}</div>
                )}
              </ErrorMessage>
              <label htmlFor={"email"}>Confirm-Password</label>
              <Field
                id={"confirmPassword"}
                className=" p-1 bg-[#E8F0FE]"
                placeholder={"confirmPassword"}
                name="confirmPassword"
                type="password"
              />
              <ErrorMessage name="confirmPassword">
                {(errorMsg) => (
                  <div className=" text-rose-600">*{errorMsg}</div>
                )}
              </ErrorMessage>
              <label htmlFor={"email"}>Avatar</label>
              <input
                id={"image"}
                className=" p-1"
                name="Avatar"
                type={"file"}
                onChange={handelImage}
                accept="image/png, image/jpeg, image/jpg"
              />
              <button
                type="submit"
                className="rounded-sm bg-[#f0c14b] h-[30px] mt-5 border-2  border-r-[#a88734] border-l-[#9c7e31] border-y-[#846a29]"
              >
                Register
              </button>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default ClientSignup;

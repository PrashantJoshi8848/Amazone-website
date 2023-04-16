import React, { useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "./Validation/ValidationSchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToken, addUser } from "./Redux/slice/AuthSlice";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      toast.error("already logged in ");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, []);
  const dispatch = useDispatch();
  const { mutateAsync } = useMutation((value) =>
    axios.post(value.url, value.account)
  );

  const { user } = useSelector((state) => state.Auth);

  const handelSubmit = async (value) => {
    const { email, password } = value;
    try {
      await toast.promise(
        mutateAsync({
          account: { email, password },
          url: "/api/v1/Auth/login",
        }).then((res) => {
          if (res) {
            dispatch(addToken(res?.data?.Jwt));
            return axios.get("/api/v1/Auth/current-user", {
              headers: {
                Authorization: `Bearer ${res?.data?.Jwt}`,
              },
            });
          }
        }),
        {
          success: {
            render({ data }) {
              if (data !== undefined) {
                toast.dismiss("loggedInClientToast");
                setTimeout(() => {
                  dispatch(addUser(data?.data));
                  navigate("/");
                }, 1000);
                return "Login Successful. Redirecting.....";
              }
            },
          },
          pending: {
            render() {
              return "Logging in...please wait";
            },
          },
          error: {
            render(err) {
              return err?.data?.response?.data?.ErroeMessage;
            },
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  async function handleCallbackResponse(response) {
    try {
      await toast.promise(
        mutateAsync({
          account: { token: response.credential },
          url: "/api/v1/Auth/google-register",
        })
          .then((res) => {
            console.log(res?.data);
            dispatch(addToken(res?.data?.Jwt));
            return axios.get("/api/v1/Auth/current-user", {
              headers: {
                Authorization: `Bearer ${res?.data?.Jwt}`,
              },
            });
          })
          .catch((err) => {
            toast.error(err?.response?.data?.ErroeMessage);
            // return err;
          }),
        {
          success: {
            render({ data }) {
              console.log(data);
              if (data) {
                toast.dismiss("loggedInClientToast");
                dispatch(addUser(data?.data));
                setTimeout(() => {
                  navigate("/");
                }, 1000);
                return "Login Successful. Redirecting.....";
              }
            },
          },
          pending: {
            render() {
              return "Logging in...please wait";
            },
          },
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "76641843004-h20h6fnudvjceph1q1rk07v90ra4leg6.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "larger",
      border: "none",
      type: "stander",
      Text: "sign up with",
      shape: "rectangle",
      context: "use",
    });
  }, []);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={handelSubmit}
      enableReinitialize
    >
      <div className=" h-screen w-screen overflow-hidden">
        <Nav />
        <div className="login flex justify-center items-start">
          <Link to="/">
            <img src={"logo.png"} className="login__logo" alt="amz_logo" />
          </Link>
          <div className="login__container">
            <h1>Sign-In</h1>

            <Form>
              <h5>E-mail</h5>
              <Field
                id={"email"}
                className=" border-2 outline-none p-1 bg-[#E8F0FE]"
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
                className=" border-2 outline-none p-1 bg-[#E8F0FE]"
                placeholder={"Password"}
                name="password"
                type="password"
              />
              <ErrorMessage name="password">
                {(errorMsg) => (
                  <div className=" text-rose-600">*{errorMsg}</div>
                )}
              </ErrorMessage>

              <button type="submit" className="login__signInButton">
                Sign In
              </button>
              <div className="w-full text-center mt-2">
                <h1>OR</h1>
              </div>
              <div
                id="signInDiv"
                className=" w-full mt-2 flex justify-center items-center"
              ></div>
              <p>
                By continuing, you agree to Amazon's Conditions of Use and
                Privacy Notice.
              </p>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="login__registerButton"
              >
                Create your Amazone Account{" "}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default Login;

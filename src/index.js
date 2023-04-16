import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./StateProvider";
import reducer, { intialState } from "./reducer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import store from "./Redux/store";
import { Provider, useSelector } from "react-redux";
import Cookies from "js-cookie";
const queryClient = new QueryClient();

const token = Cookies.get("access_token");
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <>
    <Provider store={store}>
      <StateProvider reducer={reducer} intialState={intialState}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer
            position="top-center"
            style={{ fontSize: "1.2rem" }}
            autoClose={1500}
            limit={1}
          />
          <ReactQueryDevtools initialisopen="{false}" />
        </QueryClientProvider>
      </StateProvider>
    </Provider>
  </>
);

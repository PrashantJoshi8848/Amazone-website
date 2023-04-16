import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const initialState = {
  userLoggedIn: false,
  token: Cookies.get("access_token"),
  user: {
    AuthType: "",
    Avatar: null,
    Jwt: "",
    email: "",
    isVerified: false,
    name: "",
  },
};

export const AuthSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addToken: (state, actions) => {
      const token = actions.payload;
      if (token) {
        Cookies.set("access_token", token);
        state.userLoggedIn = true;
        state.token = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },
    addUser: (state, actions) => {
      state.user = actions.payload;
      localStorage.setItem("User-Details", JSON.stringify(actions.payload));
    },
    isAlreadylogin: (state) => {
      const token = Cookies.get("access_token");
      if (token === undefined) {
        state.userLoggedIn = false;
        localStorage.clear("User-Details");
        return;
      }
      state.userLoggedIn = true;
    },
    logout: (state) => {
      localStorage.clear("User-Details");
      Cookies.remove("access_token");
      state.user = {
        AuthType: "",
        Avatar: null,
        Jwt: "",
        email: "",
        isVerified: false,
        name: "",
      };
      state.userLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, addUser, isAlreadylogin, logout } = AuthSlice.actions;

export default AuthSlice.reducer;

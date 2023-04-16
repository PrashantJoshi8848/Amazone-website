import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import SingleProductSlice from "./slice/SingleSlice";

export default configureStore({
  reducer: {
    Auth: AuthSlice,
    singleProduct: SingleProductSlice,
  },
});

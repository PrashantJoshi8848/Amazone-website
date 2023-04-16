import { createSlice } from "@reduxjs/toolkit";

const initailState = {
  fulldata: [],
  //   categories: "",
  //   description: "",
  //   imageCover: "",
  //   images: [],
  //   name: "",
  //   price: null,
  //   rating: null,
  //   ratingsAverage: null,
  //   ratingsQuantity: null,
  //   startDate: [],
  //   _id: "",
};

const SingleProductSlice = createSlice({
  name: "SingleProduct",
  initialState: initailState,
  reducers: {
    AddProduct: (state, action) => {
      state.fulldata = action.payload;
      //   state._id = action.payload._id;
      //   state.categories = action.payload.categories;
      //   state.description = action.payload.description;
      //   state.imageCover = action.payload.imageCover;
      //   state.images = action.payload.images;
      //   state.name = action.payload.name;
      //   state.price = action.payload.price;
      //   state.rating = action.payload.rating;
    },
  },
});

export const { AddProduct } = SingleProductSlice.actions;

export default SingleProductSlice.reducer;

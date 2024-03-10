import { configureStore } from "@reduxjs/toolkit";
import { brandsReducer } from "./BrandsSlice.js";



export let store = configureStore({
  reducer: {
    brand: brandsReducer
  }
})
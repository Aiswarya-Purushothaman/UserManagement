import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import {apiSlice}  from './slices/apiSlice'
import { adminReducer } from "./slices/adminSlice.";
import { adminApiSlices } from "./slices/adminApiSlice";

const store=configureStore({
  reducer:{
   
    [adminApiSlices.reducerPath]:adminApiSlices.reducer,
    auth:authReducer,
    admin:adminReducer

  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true,
})

export default store;
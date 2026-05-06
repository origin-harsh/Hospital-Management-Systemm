import { configureStore } from "@reduxjs/toolkit";
import  jwtReducer  from "./Slice/JwtSlice";
import userReducer from "./Slice/userSlice";

export default configureStore({
    reducer:{
        jwt: jwtReducer,
        user:userReducer
    }
})
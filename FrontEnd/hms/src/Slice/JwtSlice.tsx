import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


const getValidToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    
    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp && decoded.exp < currentTime) {
            // Token expired — localStorage saaf karo
            localStorage.removeItem("token");
            return null;
        }
        return token;
    } catch {
        localStorage.removeItem("token");
        return null;
    }
};

const JwtSlice = createSlice({
    name: "jwt",
    initialState: getValidToken(), 
    reducers: {
        setJwt: (_, action) => {
            localStorage.setItem("token", action.payload);
            return action.payload;
        },
        removeJwt: () => {
            localStorage.removeItem("token");
            return null;
        }
    }
});

export const { setJwt, removeJwt } = JwtSlice.actions;
export default JwtSlice.reducer;
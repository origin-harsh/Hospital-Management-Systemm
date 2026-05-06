import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const getValidUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};
    
    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) return {};
        return decoded;
    } catch {
        return {};
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: getValidUser(),
    reducers: {
        setUser: (_, action) => action.payload, // ✅ ye bhi fix kiya
        removeUser: () => ({})
    }
});

export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;
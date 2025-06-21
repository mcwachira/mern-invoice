import { createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";

// LocalStorage must not be accessed on the server
let user = null;
let googleToken;

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
}

if (typeof window !== "undefined") {
  googleToken = localStorage.getItem("googleToken");
}

const decodedToken = googleToken ? decodeToken(googleToken) : null;

const initialState = {
  user: user ? user : decodedToken,
  googleToken: googleToken ? googleToken : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      console.log("Logging in:", action.payload);
      state.user = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logOut: (state) => {
      state.user = null;
      state.googleToken = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("googleToken");
      }
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserToken = (state: any) =>
  state.auth.user?.accessToken;

export const selectCurrentUserGoogleToken = (state: any) =>
  state.auth.user?.googleToken;

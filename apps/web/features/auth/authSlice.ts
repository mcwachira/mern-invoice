import { createSlice } from "@reduxjs/toolkit";

// LocalStorage must not be accessed on the server
let user = null;

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
}

const initialState = {
  user,
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
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserToken = (state: any) =>
  state.auth.user?.accessToken;

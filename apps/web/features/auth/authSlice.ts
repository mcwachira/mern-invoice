import { createSlice } from "@reduxjs/toolkit";

// const user = JSON.parse(localStorage.getItem("user")!);

const user = JSON.parse(localStorage.getItem("user") ?? "null");

const initialState = {
  user: user ? user : null,
};

//define reducer and associated action
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserToken = (state: any) =>
  state.auth.user?.accessToken;

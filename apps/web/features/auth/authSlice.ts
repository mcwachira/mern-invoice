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
  reducers: {},
});

export default authSlice.reducer;

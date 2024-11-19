import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  isAuth: false,
  id: "",
  username: "",
  is_admin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.isAuth = true;
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.is_admin = action.payload.is_admin;
      state.error = "";
    },
    LOGOUT: (state, action) => {
      state.isAuth = false;
      state.username = "";
      state.id = "";
      state.is_admin = false;
    },
    LOGIN_ERROR: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { LOGIN, LOGOUT, LOGIN_ERROR } = authSlice.actions;

export default authSlice.reducer;

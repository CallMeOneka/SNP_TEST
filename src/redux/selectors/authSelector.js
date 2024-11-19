import { createSelector } from "@reduxjs/toolkit";

export const selectAuth = (state) => state.auth;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectUserName = (state) => state.auth.username;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAdmin = (state) => state.auth.is_admin;

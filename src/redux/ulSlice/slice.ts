import { createSlice } from "@reduxjs/toolkit";

import { IAppSlice } from "./types";

const initialState: IAppSlice = {
  isLogin: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
  extraReducers: () => {},
});

export const appReducer = appSlice.reducer;
export const { login } = appSlice.actions;

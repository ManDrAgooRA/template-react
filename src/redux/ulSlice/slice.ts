import { createSlice } from "@reduxjs/toolkit";

import { IAppSlice } from "./types";

const initialState: IAppSlice = {
  isLogin: false,
  isShowLoader: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = !state.isLogin;
    },
    changeLoader: (state, action) => {
      state.isShowLoader = action.payload;
    },
  },
  extraReducers: () => {},
});

export const appReducer = appSlice.reducer;
export const { login, changeLoader } = appSlice.actions;

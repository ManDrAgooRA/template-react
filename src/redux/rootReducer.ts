import { combineReducers } from "@reduxjs/toolkit";

import { appReducer } from "./ulSlice/slice";

const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

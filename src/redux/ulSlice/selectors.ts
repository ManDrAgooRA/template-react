import { RootState } from "@redux/rootReducer";

export const getIsLoad = (state: RootState) => state.app.isLogin;
export const getIsShowLoader = (state: RootState) => state.app.isShowLoader;

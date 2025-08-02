import { RootState } from "@redux/rootReducer";

export const getIsLoad = (state: RootState) => state.app.isLogin;

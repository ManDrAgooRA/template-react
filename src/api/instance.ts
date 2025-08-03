import axios from "axios";

import store from "@redux/store";
import { changeLoader } from "@redux/ulSlice/slice";

import { applyInterceptors } from "@utils/applyInterceptors";

const { MODE, VITE_DEV_URL, VITE_PROD_URL } = import.meta.env;

const API = MODE === "development" ? VITE_DEV_URL : VITE_PROD_URL;

const data = JSON.parse(sessionStorage.getItem("authInfo") as string);
const token = data?.token || "";

export const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
  responseType: "json",
});

applyInterceptors(
  axiosInstance,
  () => store.dispatch(changeLoader(true)),
  () => store.dispatch?.(changeLoader(false)),
);

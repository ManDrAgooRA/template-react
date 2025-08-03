// Import { AnyAction } from "@reduxjs/toolkit";
// Import { AxiosInstance } from "axios";

import { popUp } from "./popup";

import type { AxiosInstance } from "axios";

export function applyInterceptors(axiosInstance: AxiosInstance, dispatchStart?: () => void, dispatchEnd?: () => void) {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const skipLoader = config.headers?.["x-skip-loader"];

      if (!skipLoader && dispatchStart) {
        dispatchStart();
      }

      const data = JSON.parse(sessionStorage.getItem("authInfo") || "{}");
      const token = data.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      if (!error.config?.headers?.["x-skip-loader"] && dispatchEnd) {
        dispatchEnd();
      }
      return Promise.reject(error);
    },
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      const skipLoader = response.config.headers?.["x-skip-loader"];

      if (!skipLoader && dispatchEnd) {
        dispatchEnd();
      }
      return response;
    },
    (error) => {
      const skipLoader = error.config?.headers?.["x-skip-loader"];

      if (!skipLoader && dispatchEnd) {
        dispatchEnd();
      }

      const { response, code } = error;

      if (code !== "ERR_NETWORK") {
        if (response?.data) {
          popUp({
            type: "error",
            message: response.data.errors?.[0]?.message || "Something went wrong",
          });
        } else {
          popUp({
            type: "error",
            message: "Something went wrong",
          });
        }
      } else {
        popUp({
          type: "error",
          message: "Lost internet connection",
        });
      }

      return Promise.reject(error);
    },
  );
}

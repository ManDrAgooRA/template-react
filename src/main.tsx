import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// eslint-disable-next-line import/order
import App from "./App.tsx";

import "./assets/styles/index.scss";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

import { LoaderContainer } from "@widgets/LoaderContainer/LoaderContainer.tsx";

import store from "@redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <LoaderContainer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <App />
    </Provider>
  </StrictMode>,
);

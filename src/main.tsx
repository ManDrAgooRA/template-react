import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// eslint-disable-next-line import/order
import App from "./App.tsx";

import "./assets/styles/index.scss";
import { Provider } from "react-redux";

import store from "@redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

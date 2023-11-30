import React from "react";
import { createRoot } from "react-dom/client";
import "./config/axios";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import App from "./App";

const rootElem = document.querySelector("#root");

createRoot(rootElem).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

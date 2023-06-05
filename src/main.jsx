import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElem = document.querySelector("#root");

createRoot(rootElem).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

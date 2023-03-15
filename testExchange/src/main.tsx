import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/Reset.scss";
import "./styles/Common.scss";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

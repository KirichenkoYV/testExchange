import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/Reset.scss";
import "./styles/Common.scss";
import { BrowserRouter } from "react-router-dom";
import store from "./store/Store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

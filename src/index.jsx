import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "@store/store.js";
import App from "@/App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

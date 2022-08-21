import React from "react";
import ReactDOM from "react-dom";
import { StateProvider } from "@/store";

import App from "@/component/app";
import "./styles.css";

let root = document.querySelector("#app");

ReactDOM.render(
  <React.Fragment>
    <StateProvider>
      <App />
    </StateProvider>
  </React.Fragment>,
  root
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "App";
import Login from "layouts/login";
import PrivateRoute from "routes/PrivateRoute";
import { VisionUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <VisionUIControllerProvider>
      <App />
    </VisionUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

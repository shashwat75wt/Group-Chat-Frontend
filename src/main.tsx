import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import theme from "./themes.ts";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store.ts";
import ErrorBoundary from "./utils/ErrorBoundaries.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Provider store={store}>
          <ErrorBoundary>
          <App />
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

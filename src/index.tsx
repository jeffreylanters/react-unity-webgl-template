import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./app";
import reportWebVitals from "./report-web-vitals";
import "./index.css";

const rootElement = document.getElementById("root");

// renders the app onto the document
render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

// enable measuring performance of the app onto the console
reportWebVitals(console.log);

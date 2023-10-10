import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";

const customTheme = {
  menu: {
    styles: {
      base: {
        menu: {
          minWidth: "min-w-[80px]"
        }
      }
    }
  },
  navbar: {
    styles: {
      base: {
        navbar: {
          initial: {
            maxWidth: "w-[100vw]",
          }
        }
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider value={customTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

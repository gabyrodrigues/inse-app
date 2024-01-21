import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { MantineContext } from "@contexts/MantineContext";
import ItemContextProvider from "@contexts/Item/provider";

import "mantine-datatable/styles.layer.css";
import "@styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineContext>
      <ItemContextProvider>
        <App />
      </ItemContextProvider>
    </MantineContext>
  </React.StrictMode>
);

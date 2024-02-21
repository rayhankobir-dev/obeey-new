import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster as ScToaster } from "./lib/utils/ui/toaster";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { PlayerProvider } from "./context/PlayerContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PlayerProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
            <ScToaster />
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </PlayerProvider>
    </Provider>
  </React.StrictMode>
);

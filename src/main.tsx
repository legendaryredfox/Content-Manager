import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import NewCreator from "./pages/NewCreator";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/creator" element={<NewCreator />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);

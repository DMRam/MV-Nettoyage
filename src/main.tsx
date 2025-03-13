import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { App } from "./App.tsx";
import { OurServiceDetail } from "./components/details/OurServiceDetail";
import { Footer } from "./components/footer/Footer.tsx";
import { CookiePolicy } from "./components/cookies/CookiePolicy.tsx";
import { ScrollToTop } from "./utils/scrolling/ScrollTop.tsx";
import { Provider } from "react-redux";
import store from "./store/index.tsx";
import { WhatsAppButton } from "./components/whatsapp/WhatsAppButton.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/service/:title" element={<OurServiceDetail />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
        </Routes>

        <Footer />
      </Router>
      <WhatsAppButton />
    </Provider>
  </React.StrictMode>
);
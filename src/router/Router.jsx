import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "@constants/routes.js";
import HomePage from "@pages/home-page.jsx";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route index exact path={routes.index} element={<HomePage />} />
      </Routes>
    </Router>
  );
}

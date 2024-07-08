import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import RumahSakitPage from "./pages/RumahSakit";
import GraphPage from "./pages/Graph";
import DarahPage from "./pages/Darah";
import PengantaranPage from "./pages/Pengantaran";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/rs" element={<RumahSakitPage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/darah" element={<DarahPage />} />
        <Route path="/pengantaran" element={<PengantaranPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import Maze from "./pages/Maze";
import Searching from "./pages/Searching";

function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path="/maze" element={<Maze />} />
        <Route path="/searching" element={<Searching />} />
      </Routes>
    </>
  );
}

export default App;

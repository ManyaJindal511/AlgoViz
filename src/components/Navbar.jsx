import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">AlgoViz</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={menuOpen ? "bar rotate-bar1" : "bar"}></div>
        <div className={menuOpen ? "bar fade-bar2" : "bar"}></div>
        <div className={menuOpen ? "bar rotate-bar3" : "bar"}></div>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li className={location.pathname === "/" ? "active-link" : ""}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className={location.pathname === "/sorting" ? "active-link" : ""}>
          <Link to="/sorting" onClick={() => setMenuOpen(false)}>Sorting</Link>
        </li>
        <li className={location.pathname === "/searching" ? "active-link" : ""}>
          <Link to="/searching" onClick={() => setMenuOpen(false)}>Searching</Link>
        </li>
        <li className={location.pathname === "/maze" ? "active-link" : ""}>
          <Link to="/maze" onClick={() => setMenuOpen(false)}>Maze</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

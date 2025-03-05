import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import ThemeToggle from "../Component_Common/ThemeToggle";
import { ThemeContext } from "../Component_Common/ThemeContext";

// ✅ 배경 이미지 불러오기
import lightModeBg from "./Component_Header_light_mode_static.png";
import darkModeBg from "./Component_Header_dark_mode.webp"; // 🔥 다크모드용 배경 추가

function Header() {
    const { isDarkMode } = useContext(ThemeContext);
  
    return (
      <header 
        className="header" 
        style={{ backgroundImage: `url(${isDarkMode ? darkModeBg : lightModeBg})` }} 
      >
        <h1 className="blog-title">Your Secret Reference</h1>
  
        <nav className="nav-menu">
          <ul>
            <li><NavLink to="/" exact className="nav-link">Home</NavLink></li>
            <li><NavLink to="/network" className="nav-link">Network</NavLink></li>
            <li><NavLink to="/os" className="nav-link">Operating System</NavLink></li>
            <li><NavLink to="/data-structure" className="nav-link">Data Structure</NavLink></li>
            <li><NavLink to="/database" className="nav-link">Database</NavLink></li>
            <li><NavLink to="/frontend" className="nav-link">Front-End</NavLink></li>
            <li><NavLink to="/qa" className="nav-link">QA</NavLink></li>
            <li><NavLink to="/algorithm" className="nav-link">Algorithm</NavLink></li>
            <li><NavLink to="/interview" className="nav-link">Real Interview</NavLink></li>
          </ul>
        </nav>
  
        <div className="search-container">
          <div className="search-bar">
            <input type="text" placeholder="Do, What you want to find!" />
            <button className="search-button">Search</button>
          </div>
        </div>
  
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
      </header>
    );
  }
  
  export default Header;

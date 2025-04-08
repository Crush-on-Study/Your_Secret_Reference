import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import ThemeToggle from "../Component_Common/ThemeToggle";
import { ThemeContext } from "../Component_Common/ThemeContext";

// ✅ 배경 이미지 불러오기
import lightModeBg from "./Component_Header_light_mode_static.png";
import darkModeBg from "./Component_Header_dark_mode.webp";

// 로그인 UI 불러오기 (아코디언 스타일) + 회원가입 (모달창)
import LoginAccordion from "../Component_Common/LoginAccordion";
import SignUpModal from "../Component_Common/SignUpModal";

function Header() {
    const { isDarkMode } = useContext(ThemeContext);
    const location = useLocation(); // ✅ 현재 경로 가져오기

    return (
      <header 
        className="header" 
        style={{ backgroundImage: `url(${isDarkMode ? darkModeBg : lightModeBg})` }} 
      >
        <h1 className="blog-title">Your Secret Reference</h1>
  
        <nav className="nav-menu">
          <ul>
            <li>
              <NavLink to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/network" className={location.pathname === "/network" ? "nav-link active" : "nav-link"}>
                Network
              </NavLink>
            </li>
            <li>
              <NavLink to="/os" className={location.pathname === "/os" ? "nav-link active" : "nav-link"}>
                Operating System
              </NavLink>
            </li>
            <li>
              <NavLink to="/data-structure" className={location.pathname === "/data-structure" ? "nav-link active" : "nav-link"}>
                Data Structure
              </NavLink>
            </li>
            <li>
              <NavLink to="/database" className={location.pathname === "/database" ? "nav-link active" : "nav-link"}>
                Database
              </NavLink>
            </li>
            <li>
              <NavLink to="/frontend" className={location.pathname === "/frontend" ? "nav-link active" : "nav-link"}>
                Front-End
              </NavLink>
            </li>
            <li>
              <NavLink to="/qa" className={location.pathname === "/qa" ? "nav-link active" : "nav-link"}>
                QA
              </NavLink>
            </li>
            <li>
              <NavLink to="/algorithm" className={location.pathname === "/algorithm" ? "nav-link active" : "nav-link"}>
                Algorithm
              </NavLink>
            </li>
            <li>
              <NavLink to="/interview" className={location.pathname === "/interview" ? "nav-link active" : "nav-link"}>
                Real Interview
              </NavLink>
            </li>
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
          <LoginAccordion />
          <SignUpModal />
        </div>
      </header>
    );
}

export default Header;

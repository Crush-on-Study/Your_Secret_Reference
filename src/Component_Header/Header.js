import React from "react";
import { NavLink } from "react-router-dom"; // ✅ NavLink 사용하여 활성화 상태 감지
import "./Header.css";
import "./Header_mediaQ.css";
import { FaSearch } from "react-icons/fa";
import ThemeToggle from "../Component_Common/ThemeToggle";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* 왼쪽: 로고 */}
        <div className="logo">
          <img src="/assets/Component_Header_logo.webp" alt="Site Logo" />
          <span>Your Secret Reference</span>
        </div>

        {/* 오른쪽: 검색창 */}
        <div className="search-container">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>

      {/* ✅ 토글 버튼을 검색창 위로 이동 */}
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>

      {/* ✅ 네비게이션 (GNB) */}
      <nav className="nav-menu">
        <ul>
          <li>
            <NavLink to="/" exact className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/network" className="nav-link" activeClassName="active">
              Network
            </NavLink>
          </li>
          <li>
            <NavLink to="/os" className="nav-link" activeClassName="active">
              Operating System
            </NavLink>
          </li>
          <li>
            <NavLink to="/data-structure" className="nav-link" activeClassName="active">
              Data Structure
            </NavLink>
          </li>
          <li>
            <NavLink to="/database" className="nav-link" activeClassName="active">
              Database
            </NavLink>
          </li>
          <li>
            <NavLink to="/frontend" className="nav-link" activeClassName="active">
              Front-End
            </NavLink>
          </li>
          <li>
            <NavLink to="/qa" className="nav-link" activeClassName="active">
              QA
            </NavLink>
          </li>
          <li>
            <NavLink to="/algorithm" className="nav-link" activeClassName="active">
              Algorithm
            </NavLink>
          </li>
          <li>
            <NavLink to="/interview" className="nav-link" activeClassName="active">
              Real Interview
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

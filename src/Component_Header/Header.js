import React from "react";
import "./Header.css";
import "./Header_mediaQ.css";
import { FaSearch, FaSun , FaMoon } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* 왼쪽: 로고 */}
        <div className="logo">
          <img src="/logo.png" alt="Company Logo" />
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

        {/* 다크 모드 토글 버튼 */}
        <div className="dark-mode-toggle">
            <FaSun className="toggle-icon sun" />
            <div className="toggle-switch">
            <div className="toggle-circle"></div>
            </div>
            <FaMoon className="toggle-icon moon" />
        </div>

      {/* 네비게이션 (로고 아래로 배치됨) */}
      <nav className="nav-menu">
        <ul>
          <li className="active">Home</li>
          <li>Network</li>
            <li>Operating System</li>
            <li>Data Structure</li>
            <li>Database</li>
            <li>Front-End</li>
            <li>QA</li>
            <li>Algorithm</li>
            <li>Real Interview</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

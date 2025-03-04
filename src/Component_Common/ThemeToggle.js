import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // ✅ 다크모드 전환 시 현재 포커스를 유지
    const activeElement = document.activeElement;
    return () => {
      if (activeElement) {
        activeElement.focus();
      }
    };
  }, [isDarkMode]);

  return (
    <div className="theme-toggle">
      <FaSun className="theme-icon" />
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
        <span className="slider"></span>
      </label>
      <FaMoon className="theme-icon" />
    </div>
  );
};

export default ThemeToggle;

import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // ✅ 다크모드 여부를 localStorage에 저장
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // ✅ body 클래스 변경 (헤더 배경 변경을 위해 필요)
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="theme-toggle">
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
        <span className="slider">
          <span className="sun"></span>
          <span className="moon"></span>
          <span className="stars"></span>
          <span className="clouds"></span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;

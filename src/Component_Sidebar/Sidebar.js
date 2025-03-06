import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { ThemeContext } from "../Component_Common/ThemeContext";
import { FaEnvelope, FaEye, FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Sidebar = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  // ✅ 사이드바 열기/닫기
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // ✅ 개별 아코디언 섹션 열기/닫기
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* ✅ 사이드바 토글 버튼 (화살표) */}
      <button className={`sidebar-toggle ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}>
        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* ✅ 사이드바 컨테이너 */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""} ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="profile-section">
          <img src={"/assets/Component_Sidebar_profile.png"} alt="Profile" className="profile-img" />
          <div className="profile-text">
            <h2 className="nickname">Crush on Study</h2>
            <p className="real-name">KANG HYUN BIN</p>
          </div>
        </div>

        {/* ✅ 경력 아코디언 */}
        <div className="sidebar-section">
          <button className="accordion-header" onClick={() => toggleSection("career")}>
            🔹 경력 정보
          </button>
          <div className={`accordion-content ${openSections["career"] ? "open" : ""}`}>
            <p><strong>Main Job:</strong> F/E & PM</p>
            <p><strong>Main Tech Lang:</strong> JS & Ruby on Rails</p>
            <p><strong>Aims to:</strong> Full stack</p>
          </div>
        </div>

        {/* ✅ 방문자수 아코디언 */}
        <div className="sidebar-section">
          <button className="accordion-header" onClick={() => toggleSection("visitors")}>
            👀 방문자 수
          </button>
          <div className={`accordion-content ${openSections["visitors"] ? "open" : ""}`}>
            <FaEye className="icon" /> <span>Hits: 55 / 7483</span>
          </div>
        </div>

        {/* ✅ 연락처 아코디언 */}
        <div className="sidebar-section">
          <button className="accordion-header" onClick={() => toggleSection("contact")}>
            📩 연락처
          </button>
          <div className={`accordion-content ${openSections["contact"] ? "open" : ""}`}>
            <FaEnvelope className="icon" /> <span>twonkang00@naver.com</span>
          </div>
        </div>

        {/* ✅ 외부 링크 아코디언 */}
        <div className="sidebar-section">
          <button className="accordion-header" onClick={() => toggleSection("links")}>
            🔗 외부 링크
          </button>
          <div className={`accordion-content ${openSections["links"] ? "open" : ""}`}>
            <a href="https://notion.com" target="_blank" rel="noopener noreferrer" className="link-btn">⭐ Notion</a>
            <a href="https://blog.naver.com/twonkang00" target="_blank" rel="noopener noreferrer" className="link-btn">⭐ Naver Blog</a>
            <a href="https://github.com/Crush-on-Study" target="_blank" rel="noopener noreferrer" className="link-btn">⭐ GitHub Profile</a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

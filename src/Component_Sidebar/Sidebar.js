import React, { useContext } from "react";
import "./Sidebar.css";
import "./Sidebar_mediaQ.css";
import { ThemeContext } from "../Component_Common/ThemeContext";
import { FaEnvelope, FaExternalLinkAlt, FaEye } from "react-icons/fa";

function Sidebar() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <aside className={`sidebar ${isDarkMode ? "dark-mode" : ""}`}>
      {/* 프로필 섹션 */}
      <div className="profile-section">
        <img src={"/assets/Component_Sidebar_profile.png"} alt="Profile" className="profile-img" />
        <div className="profile-text">
          <h2 className="nickname">Crush on Study</h2>
          <p className="real-name">KANG HYUN BIN</p>
        </div>
      </div>

      {/* 경력 섹션 */}
      <div className="career-section">
        <p><strong>Main Job:</strong> F/E & PM</p>
        <p><strong>Main Tech Lang:</strong> JS & Ruby on Rails</p>
        <p><strong>Aims to:</strong> Full stack</p>
      </div>

      {/* 방문자 수 */}
      <div className="visitor-section">
        <FaEye className="icon" /> <span>Hits: 55 / 7483</span>
      </div>

      {/* 연락처 */}
      <div className="contact-section">
        <FaEnvelope className="icon" /> <span>twonkang00@naver.com</span>
      </div>

      {/* 외부 링크 */}
      <div className="links-section">
        <a href="https://notion.so" target="_blank" rel="noopener noreferrer" className="link-btn">
          <img src="/assets/Component_Sidebar_Notion.png" alt="Notion" className="link-icon" />
          노션 페이지 <FaExternalLinkAlt className="icon" />
        </a>
        <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" className="link-btn">
          <img src="/assets/Component_Sidebar_Naver.png" alt="Naver" className="link-icon" />
          네이버 블로그 <FaExternalLinkAlt className="icon" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="link-btn">
          <img src="/assets/Component_Sidebar_Github.png" alt="GitHub" className="link-icon" />
          GitHub Profile <FaExternalLinkAlt className="icon" />
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;

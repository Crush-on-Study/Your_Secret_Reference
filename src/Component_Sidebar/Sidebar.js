import React, { useContext } from "react";
import "./Sidebar.css";
import "./Sidebar_mediaQ.css";
import { ThemeContext } from "../Component_Common/ThemeContext"; // ✅ 다크모드 감지 추가
import { FaEnvelope, FaExternalLinkAlt, FaEye } from "react-icons/fa";

function Sidebar() {
  const { isDarkMode } = useContext(ThemeContext); // ✅ 다크모드 여부 가져오기

  return (
    <aside className={`sidebar ${isDarkMode ? "dark-mode" : ""}`}>
      {/* 프로필 사진 */}
      <div className="profile">
        <img src={"/assets/Component_Sidebar_profile.png"} alt="Profile" className="profile-img" />
        <h2 className="nickname">😎Crush on Study😎</h2>
        <p className="real-name">KANG HYUN BIN</p>
      </div>

      {/* 회사 & 경력 */}
      <div className="career">
        <p>Main Job : F/E & PM</p>
        <p>Main Tech Lang : JS & Ruby on Rails</p>
        <p>Aims to Full stack</p>
      </div>

      {/* 방문자 수 */}
      <div className="visitor-count">
        <FaEye className="icon" /> <span>Hits: 55 / 7483</span>
      </div>

      {/* 연락처 & 링크 */}
      <div className="contact">
        <p>
          <FaEnvelope className="icon" /> twonkang00@naver.com
        </p>
      </div>

      {/* 외부 링크 */}
      <div className="links">
        <a href="https://notion.so" target="_blank" rel="noopener noreferrer">
          노션 페이지 <FaExternalLinkAlt className="icon" />
        </a>
        <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer">
          네이버 블로그 <FaExternalLinkAlt className="icon" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub Profile <FaExternalLinkAlt className="icon" />
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;

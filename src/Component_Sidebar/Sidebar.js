import React from "react";
import "./Sidebar.css";
import "./Sidebar_mediaQ.css";
// import profileImg from "../assets/profile.jpg"; // ✅ 프로필 사진 (이미지 추가 필요 -> 오둥이 사진 가져오쟈...)
import { FaEnvelope, FaExternalLinkAlt, FaEye } from "react-icons/fa"; // ✅ 아이콘 추가

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* 프로필 사진 */}
      <div className="profile">
        {/* <img src={profileImg} alt="Profile" className="profile-img" /> */}
        <h2 className="nickname">😎Crush on Study😎</h2>
        <p className="real-name">강현빈</p>
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
        {/* 여기는 방문 횟수 호출 API가 들어갈 예정 */}
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

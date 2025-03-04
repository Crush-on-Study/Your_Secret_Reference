import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© 2025 Hyunbin. All Rights Reserved.</p>
        <p>Designed & Built with ❤️ by Hyunbin</p>
        
        {/* 소셜 미디어 링크 */}
        <div className="social-links">
          <a href="https://github.com/Crush-on-Study" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/hyun-bin-k-005198211/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="mailto:twonkang00@naver.com">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

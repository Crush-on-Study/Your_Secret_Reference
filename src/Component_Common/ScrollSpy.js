import React, { useEffect, useState } from "react";
import "./ScrollSpy.css";

const sections = [
  { id: "Intro_Carousel", label: "프로젝트" },
  { id: "Tech_chart", label: "기술 스택" },
  { id: "Career", label: "경력 사항" },
];

const ScrollSpy = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrollPosition, setScrollPosition] = useState(150); // ✅ 초기 위치 설정

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);

      // ✅ 스크롤 따라 이동
      setScrollPosition(window.scrollY + 150); // 기본 위치 + 스크롤 값
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="scroll-spy" style={{ top: `${scrollPosition}px` }}>
      {sections.map((section) => (
        <button
          key={section.id}
          className={activeSection === section.id ? "active" : ""}
          onClick={() => scrollToSection(section.id)}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
};

export default ScrollSpy;

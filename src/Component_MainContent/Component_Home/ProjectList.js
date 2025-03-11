import React from "react";
import "./ProjectList.css";

const projectData = [
  {
    year: "2025",
    company: "Company A",
    title: "선박 운항 실시간 대시보드 시스템",
    role: "개백수",
    techStack: "JavaScript, Figma, OutSystems",
    description: "그냥 숟가락만 쳐얹음"
  },
  {
    year: "2023.07 ~ 2024.08",
    company: "Company B",
    title: "제조산업 Target LCA 탄소데이터 분석 플랫폼 구축",
    role: "기획자 , 프론트엔드 개발자 , 데이터분석 (Sub)",
    techStack: "Figma, React , Python , Pandas",
    description: "공정, 수송, 사용, 폐기 및 재활용 과정에서 발생한 탄소데이터 실시간 발생 현황 제공"
  },
  {
    year: "2025.03 ~ 2025.06",
    company: "Company A",
    title: "사내 Service Request 관리 프로그램 구현",
    role: "기획자 , 백엔드 개발자 , 프론트엔드 보조",
    techStack: "Vue.js , Node.js , Figma , Notion",
    description: "기간계 시스템 경량화를 위한 SR Tab 독립 모듈화 및 고도화 작업"
  }
];

const ProjectList = () => {
  return (
    <div className="timeline-container">
      {projectData.map((project, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-icon">📌</div>
          <div className="timeline-content">
            <h3>{project.title}</h3>
            <p><strong>회사:</strong> {project.company}</p>
            <p><strong>역할:</strong> {project.role}</p>
            <p><strong>기술 스택:</strong> {project.techStack}</p>
            <div className="tooltip">{project.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;

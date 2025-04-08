import React from "react";
import "./TechDetails.css";

const techData = {
  "C++": {
    description: "반도체 회사 테스트 엔지니어로 근무하며 반도체 테스트장비 내 프로그램 구현",
    experience: "3년",
    icon: "🔷",
  },
  Python: {
    description: "데이터 분석 관련 라이브러리 경험 보유",
    experience: "3년",
    icon: "🐍",
  },
  JavaScript: {
    description: "React, Vue 등을 활용한 프론트엔드 개발 및 백엔드(Node.js)에도 익숙함.",
    experience: "1년",
    icon: "🟨",
  },
  Ruby: {
    description: "Ruby on Rails 프레임워크를 활용한 웹 애플리케이션 개발 경험이 있음.",
    experience: "2년",
    icon: "💎",
  },
  React: {
    description: "컴포넌트 기반 UI 개발에 익숙하며, Redux 및 상태 관리 패턴 활용 가능.",
    experience: "1년",
    icon: "⚛️",
  },
  Flutter: {
    description: "크로스플랫폼 모바일 개발을 경험하였으며, UI 최적화 및 애니메이션 처리 가능.",
    experience: "0.5년",
    icon: "📱",
  },
};

const TechDetails = () => {
  return (
    <div className="tech-details-container" style={{ background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
        <h2>⭐ Experience Description</h2>
      {Object.entries(techData).map(([techName, tech]) => (
        <div key={techName} className="tech-item" style={{ display: 'flex', alignItems: 'center', textAlign: 'left', background: 'none', padding: '10px', borderBottom: '1px solid #ddd', width: '100%' }}>
          <span className="tech-icon" style={{ marginRight: '10px' }}>{tech.icon}</span>
          <p className="tech-description" style={{ margin: 0 }}>
            <strong>{techName}:</strong> {tech.description} <span className="tech-experience">(경험: {tech.experience})</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TechDetails;

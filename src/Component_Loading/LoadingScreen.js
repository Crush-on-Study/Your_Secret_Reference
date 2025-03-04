import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";

const messages = [
  "⚡ IT취준생의 시크릿 웨폰",
  "🔋 HR팀이 찾던 시크릿 개발자",
  "🔍 Meet My Open Source!",
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let currentIndex = 0;

    // ✅ 2초마다 문구 변경 + 프로그레스 바 업데이트
    const interval = setInterval(() => {
      if (currentIndex <= messages.length) {
        setMessageIndex(currentIndex); // 문구 변경
        setProgress((currentIndex + 1) * 33.3); // 프로그레스 바 33.3%씩 증가
        currentIndex++;
      } else {
        clearInterval(interval); // ✅ 모든 문구가 끝나면 인터벌 종료
        setTimeout(onComplete, 1000); // ✅ 마지막 문구 1초 더 보여준 후 메인 화면 이동
      }
    }, 1000); // ✅ 2초마다 실행

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-animation"></div>

      {/* ✅ 프로그레스 바 & 문구 */}
      <div className="loading-text-container">
        <div className="progress-bar">
          <div className="progress-electric"></div>
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-text">{messages[messageIndex]}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

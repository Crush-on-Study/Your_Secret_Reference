import React, { useState, useContext } from "react";
import "./SignUpModal.css";
import { ThemeContext } from "./ThemeContext"; // ✅ 다크모드/라이트모드 적용
import { FaArrowLeft, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function SignUpModal({ isOpen, onClose }) {
  const { isDarkMode } = useContext(ThemeContext); // ✅ 다크모드 상태 가져오기
  const [step, setStep] = useState(1); // ✅ 회원가입 진행 단계 (1 → 2 → 3)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  if (!isOpen) return null; // 모달이 닫힌 상태라면 렌더링하지 않음

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <div className="signup-modal-overlay">
      <div className={`signup-modal ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        {/* ✅ 브레드스크럼 (회원가입 진행 단계) */}
        <div className="breadcrumb">
          <span className={step === 1 ? "active" : ""}>이메일</span>
          <span className={step === 2 ? "active" : ""}>비밀번호</span>
          <span className={step === 3 ? "active" : ""}>프로필 설정</span>
        </div>

        <div className="signup-container">
          {/* ✅ 왼쪽 이미지 */}
          <div className="signup-left">
            <img src="/assets/signup-bg.png" alt="Sign Up" className="signup-image" />
          </div>

          {/* ✅ 오른쪽 입력 필드 */}
          <div className="signup-right">
            {step === 1 && (
              <>
                <h2>이메일 입력</h2>
                <div className="input-group">
                  <FaEnvelope className="icon" />
                  <input 
                    type="email" 
                    placeholder="이메일을 입력하세요" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <button className="next-button" onClick={handleNext}>다음</button>
              </>
            )}

            {step === 2 && (
              <>
                <h2>비밀번호 설정</h2>
                <div className="input-group">
                  <FaLock className="icon" />
                  <input 
                    type="password" 
                    placeholder="비밀번호 입력" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <div className="input-group">
                  <FaLock className="icon" />
                  <input 
                    type="password" 
                    placeholder="비밀번호 확인" 
                    required 
                  />
                </div>
                <button className="prev-button" onClick={handlePrev}><FaArrowLeft /> 이전</button>
                <button className="next-button" onClick={handleNext}>다음</button>
              </>
            )}

            {step === 3 && (
              <>
                <h2>프로필 설정</h2>
                <div className="input-group">
                  <FaUser className="icon" />
                  <input 
                    type="text" 
                    placeholder="닉네임 입력" 
                    value={nickname} 
                    onChange={(e) => setNickname(e.target.value)} 
                    required 
                  />
                </div>
                <button className="prev-button" onClick={handlePrev}><FaArrowLeft /> 이전</button>
                <button className="signup-button">가입 완료</button>
              </>
            )}

            {/* 닫기 버튼 */}
            <button className="close-button" onClick={onClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;

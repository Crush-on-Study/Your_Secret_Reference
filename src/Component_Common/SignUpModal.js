import React, { useState, useContext, useEffect } from "react";
import "./SignUpModal.css";
import { ThemeContext } from "./ThemeContext";
import { FaArrowLeft, FaUser, FaEnvelope, FaLock, FaCheck, FaTimes } from "react-icons/fa";
import { signUp, checkNicknameExists } from "../Infra_Firebase/auth"; // ✅ 닉네임 중복 체크 추가

function SignUpModal({ isOpen, onClose }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    number: false,
    letter: false,
  });
  const [nicknameError, setNicknameError] = useState("");

  // ✅ 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNickname("");
      setPasswordValidations({ length: false, number: false, letter: false });
      setNicknameError("");
    }
  }, [isOpen]);

  // ✅ 이메일 유효성 검사
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ 비밀번호 실시간 유효성 검사
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValidations({
      length: newPassword.length >= 8,
      number: /\d/.test(newPassword),
      letter: /[A-Za-z]/.test(newPassword),
    });
  };

  // ✅ 닉네임 중복 체크
  const handleNicknameChange = async (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    if (newNickname.trim() === "") {
      setNicknameError("");
      return;
    }
    const exists = await checkNicknameExists(newNickname);
    setNicknameError(exists ? "❌ 이미 사용 중인 닉네임입니다." : "✅ 사용 가능한 닉네임입니다.");
  };

  const handleNext = () => {
    if (step === 1 && !validateEmail(email)) {
      alert("❌ 올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (step === 2) {
      if (!passwordValidations.length || !passwordValidations.number || !passwordValidations.letter) {
        alert("❌ 비밀번호가 요구 조건을 충족하지 않습니다.");
        return;
      }
      if (password !== confirmPassword) {
        alert("❌ 비밀번호가 일치하지 않습니다.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password, nickname);
      alert("✅ 회원가입 성공!");
      onClose();
    } catch (error) {
      alert("❌ 회원가입 실패: " + error.message);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="signup-modal-overlay" onClick={onClose}>
      <div className={`signup-modal ${isDarkMode ? "dark-mode" : "light-mode"}`} onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>Close</button>

        <div className="breadcrumb">
          <span className={step === 1 ? "active" : ""}>이메일</span>
          <span className={step === 2 ? "active" : ""}>비밀번호</span>
          <span className={step === 3 ? "active" : ""}>프로필 설정</span>
        </div>

        <div className="signup-container">
          <div className="signup-left">
            <img src="/assets/signup-bg.png" alt="Sign Up" className="signup-image" />
          </div>

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
                    onChange={handlePasswordChange} 
                    required 
                  />
                </div>
                <div className="validation-messages">
                  <p>{passwordValidations.length ? "✅" : "❌"} 8자 이상</p>
                  <p>{passwordValidations.number ? "✅" : "❌"} 숫자 포함</p>
                  <p>{passwordValidations.letter ? "✅" : "❌"} 영문 포함</p>
                </div>
                <div className="input-group">
                  <FaLock className="icon" />
                  <input 
                    type="password" 
                    placeholder="비밀번호 확인" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onChange={handleNicknameChange} 
                    required 
                  />
                </div>
                <p className="nickname-validation">{nicknameError}</p>
                <button className="prev-button" onClick={handlePrev}><FaArrowLeft /> 이전</button>
                <button className="signup-button" onClick={handleSignUp} disabled={loading}>
                  {loading ? "가입 중..." : "가입 완료"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;

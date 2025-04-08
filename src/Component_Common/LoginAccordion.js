import React, { useState } from "react";
import "./LoginAccordion.css";
import { login, logout } from "../Infra_Firebase/auth";
import { FaUser, FaLock } from "react-icons/fa";
import useAuth from "../Infra_Firebase/useAuth";
import SignUpModal from "./SignUpModal"; // ✅ 회원가입 모달 추가

function LoginAccordion() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // ✅ 회원가입 모달 상태 (기본적으로 닫힘)
  const { user } = useAuth();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setEmailVerified(true);
      setTimeout(() => {
        setShowPasswordField(true);
      }, 500);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("✅ 로그인 성공!");
      setIsOpen(false);
    } catch (error) {
      alert("❌ 로그인 실패: " + error.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    alert("✅ 로그아웃 완료!");
    setEmail("");
    setPassword("");
    setShowPasswordField(false);
    setEmailVerified(false);
  };

  return (
    <div className="login-container">
      {user ? (
        <button className="login-button" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="login-button" onClick={() => setIsOpen(!isOpen)}>Login</button>
      )}

      {isOpen && !user && (
        <div className="login-form open">
          <div className="login-left">
            <img src="/assets/Component_LoginAccordian_sign.webp" alt="Login Illustration" className="login-image" />
          </div>
          <div className="login-right">
            <h2>Hello! <span className="greeting">Good 2 C U</span></h2>
            <h3>Login <span className="bold-text">your account</span></h3>
            <form onSubmit={showPasswordField ? handleLogin : handleEmailSubmit}>
              {!showPasswordField ? (
                <>
                  {/* ✅ 이메일 입력 단계 */}
                  <div className="input-group">
                    <FaUser className="icon" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <p className="forgot-section">
                    <span className="forgot-link">Forgot ID?</span>
                    <span className="create-account" onClick={() => setIsSignUpOpen(true)}>Create Account</span>
                  </p>
                  {emailVerified && <p className="id-confirmation">✅ 확인되었습니다!</p>}
                  <button type="submit" className="submit-button">Next</button>
                </>
              ) : (
                <>
                  {/* ✅ 비밀번호 입력 단계 */}
                  <div className="input-group fade-in">
                    <FaLock className="icon" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="forgot-link">Forgot Password?</p>
                  <button type="submit" className="submit-button">Login</button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ✅ 회원가입 모달 추가 */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </div>
  );
}

export default LoginAccordion;

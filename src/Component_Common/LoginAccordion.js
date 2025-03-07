import React, { useState } from "react";
import "./LoginAccordion.css";
import SignUpModal from "./SignUpModal"; // ✅ 회원가입 모달 추가
import { FaUser, FaLock } from "react-icons/fa";

function LoginAccordion() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fadeOutUsername, setFadeOutUsername] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // ✅ 회원가입 모달 상태 추가

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setShowConfirmation(true);
      setSubmitted(true);
      setTimeout(() => {
        setShowConfirmation(false);
        setFadeOutUsername(true);
        setTimeout(() => {
          setShowPasswordField(true);
        }, 500);
      }, 1500);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setIsLoggedIn(true);
      setIsOpen(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setShowPasswordField(false);
    setSubmitted(false);
    setFadeOutUsername(false);
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <button className="login-button" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="login-button" onClick={() => setIsOpen(!isOpen)}>Login</button>
      )}
      <div className={`login-form ${isOpen ? "open" : ""}`}>
        <div className="login-left">
          <img src="/assets/Component_LoginAccordian_sign.webp" alt="Login Illustration" className="login-image" />
        </div>
        <div className="login-right">
          <h2>Hello! <span className="greeting">Good 2 C U</span></h2>
          <h3>Login <span className="bold-text">your account</span></h3>
          <form onSubmit={showPasswordField ? handleLogin : handleUsernameSubmit}>
            {!showPasswordField ? (
              <>
                <div className={`input-group ${fadeOutUsername ? "fade-out" : ""}`}>
                  <FaUser className="icon" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <p className="forgot-link">Forget ID?</p>
                {submitted && (
                  <p className={`id-confirmation ${showConfirmation ? "show-confirmation" : ""}`}>
                    ✅ 확인되었습니다!
                  </p>
                )}
              </>
            ) : (
              <>
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
                <p className="forgot-link">Forget Password?</p>
              </>
            )}
            <button type="submit" className="submit-button">
              {showPasswordField ? "Login" : "Next"}
            </button>

            {/* ✅ 회원가입 모달을 열기 위한 버튼 */}
            <p className="create-account" onClick={() => setIsSignUpOpen(true)}>Create Account</p>
          </form>
        </div>
      </div>

      {/* ✅ 회원가입 모달 추가 */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </div>
  );
}

export default LoginAccordion;

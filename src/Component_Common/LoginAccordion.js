import React, { useState } from "react";
import "./LoginAccordion.css";
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
          <img src="/assets/login-bg.png" alt="Login Illustration" className="login-image" />
          <p className="login-text">Login your Account to get full User Experience</p>
        </div>
        <div className="login-right">
          <h2>Hello! <span className="greeting">Good Morning</span></h2>
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
            <p className="create-account">Create Account</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAccordion;

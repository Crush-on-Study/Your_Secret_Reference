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
      }, 2000);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setIsLoggedIn(true);
      setIsOpen(false);
    }, 2000);
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
      {isOpen && (
        <div className="login-form">
          <h2>Login</h2>
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
                {submitted && (
                  <p className={`id-confirmation ${showConfirmation ? "show-confirmation" : ""}`}>
                    ✅ 확인되었습니다!
                  </p>
                )}
              </>
            ) : (
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
            )}
            <button type="submit" className="submit-button">
              {showPasswordField ? "Sign In" : "Next"}
            </button>
            {showPasswordField && showConfirmation && (
              <p className="id-confirmation show-confirmation">✅ 확인되었습니다!</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginAccordion;

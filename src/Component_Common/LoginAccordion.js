import React, { useState } from "react";
import "./LoginAccordion.css";
import { login, logout } from "../Infra_Firebase/auth"; // ✅ 로그인 & 로그아웃 추가
import { FaUser, FaLock } from "react-icons/fa";
import useAuth from "../Infra_Firebase/useAuth"; // ✅ 로그인 상태 가져오기

function LoginAccordion() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth(); // ✅ 로그인 상태 확인

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
            <form onSubmit={handleLogin}>
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
              <div className="input-group">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginAccordion;

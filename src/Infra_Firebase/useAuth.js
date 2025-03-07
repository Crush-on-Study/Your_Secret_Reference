import { useState, useEffect } from "react";
import { checkAuth } from "./auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가

  useEffect(() => {
    checkAuth(({ user, isAdmin }) => {
      console.log("🔥 현재 로그인한 사용자:", user);
      console.log("🛠️ 관리자 여부:", isAdmin);

      setUser(user);
      setIsAdmin(isAdmin);
      setLoading(false); // ✅ 로그인 상태 확인 완료 후 로딩 종료
    });
  }, []);

  return { user, isAdmin, loading }; // ✅ 로딩 상태도 반환
};

export default useAuth;

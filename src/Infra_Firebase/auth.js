import { auth, db } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, query, where, doc, getDoc, setDoc,getDocs } from "firebase/firestore";

// ✅ Firestore에서 관리자 여부 확인 (UID 기반 조회)
export const checkAdminStatus = async (uid) => {
  try {
    if (!uid) return false;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log("✅ Firestore에서 가져온 사용자 데이터:", userData);
      return userData.role === "admin";
    } else {
      console.log("❌ Firestore에서 해당 사용자 정보를 찾을 수 없음.");
      return false;
    }
  } catch (error) {
    console.error("❌ Firestore 관리자 확인 오류:", error.message);
    return false;
  }
};

// ✅ 현재 로그인된 사용자 확인 함수
export const checkAuth = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const isAdmin = await checkAdminStatus(user.uid);
      console.log("🔥 로그인된 사용자:", user.email);
      console.log("🛠️ 관리자 여부:", isAdmin);
      callback({ user, isAdmin });
    } else {
      callback({ user: null, isAdmin: false });
    }
  });
};

// ✅ 로그인 함수 추가
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ 로그인 성공:", userCredential.user);

    return new Promise((resolve) => {
      checkAuth((userData) => {
        console.log("✅ 로그인 후 상태 업데이트:", userData);
        resolve(userData);
      });
    });
  } catch (error) {
    console.error("❌ 로그인 오류:", error.message);
    throw error;
  }
};

// ✅ 로그아웃 함수 추가
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("✅ 로그아웃 완료");
    window.location.href = "/"; // 강제 새로고침으로 로그아웃 반영
  } catch (error) {
    console.error("❌ 로그아웃 오류:", error.message);
  }
};

// ✅ Firebase 회원가입 함수 (기본 사용자 role: "user")
export const signUp = async (email, password, nickname) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("✅ 회원가입 성공:", user);

    // ✅ 특정 이메일 자동 관리자 부여 가능 (예: "admin@example.com")
    const role = email === "admin@example.com" ? "admin" : "user";

    // ✅ Firestore에 사용자 정보 저장 (UID 기반)
    await setDoc(doc(db, "users", user.uid), {
      email,
      nickname,
      role,
    });

    return user;
  } catch (error) {
    console.error("❌ 회원가입 오류:", error.message);
    throw error;
  }
};

// ✅ 닉네임 중복 체크 함수 추가
export const checkNicknameExists = async (nickname) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("nickname", "==", nickname));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // ✅ 중복된 닉네임이 있으면 true 반환
  } catch (error) {
    console.error("❌ 닉네임 중복 체크 오류:", error);
    return false;
  }
};

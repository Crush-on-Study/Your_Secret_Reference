import { auth, db } from "./firebase";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// ✅ Firestore에서 관리자 여부 확인 (UID 기반 조회)
export const checkAdminStatus = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.data().role === "admin") {
      console.log("✅ Firestore에서 관리자 계정 확인됨!");
      return true;
    } else {
      console.log("❌ Firestore에서 관리자 아님 또는 데이터 없음");
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
    console.log("🔍 Firebase에서 로그인된 사용자:", user);
    
    if (user) {
      const isAdmin = await checkAdminStatus(user.uid);
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
  } catch (error) {
    console.error("❌ 로그아웃 오류:", error.message);
  }
};

// ✅ 회원가입 함수 추가
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ 회원가입 성공:", userCredential.user);

    // ✅ Firestore에 사용자 데이터 저장
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      role: "user" // 기본 역할은 일반 사용자
    });

    return userCredential.user;
  } catch (error) {
    console.error("❌ 회원가입 오류:", error.message);
    throw error;
  }
};

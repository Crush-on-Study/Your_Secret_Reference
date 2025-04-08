import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// 환경 변수 유효성 검사
const requiredEnvVars = [
  "REACT_APP_API_KEY",
  "REACT_APP_AUTH_DOMAIN",
  "REACT_APP_PROJECT_ID",
  "REACT_APP_STORAGE_BUCKET",
  "REACT_APP_MESSAGING_SENDER_ID",
  "REACT_APP_APP_ID",
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`환경 변수 ${envVar}가 설정되지 않았습니다.`);
  }
}

// Firebase 초기화
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase 초기화 실패:", error);
  throw error;
}

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// 애널리틱스 활성화 (프로덕션 환경에서만)
if (
  process.env.REACT_APP_MEASUREMENT_ID &&
  process.env.NODE_ENV === "production"
) {
  getAnalytics(app);
}

export { app, db, auth, storage };
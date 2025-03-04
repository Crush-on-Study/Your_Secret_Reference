// Firebase 초기화 코드 파일
// ✅ Firebase SDK 가져오기
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Firebase 프로젝트 설정 (⚠️ 여기에 본인의 Firebase 설정을 입력해야 함!)
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// ✅ Firebase Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// 애널리틱스 활성화
if (process.env.MEASUREMENT_ID) {
  getAnalytics(app);
}

export { db };

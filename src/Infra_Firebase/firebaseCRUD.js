import { db } from "./firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

// ✅ Firestore에서 게시글 목록 가져오기
export const fetchPosts = async () => {
  try {
    console.log("🔥 Firestore에서 posts 컬렉션 데이터 가져오는 중...");
    const querySnapshot = await getDocs(collection(db, "posts")); // ✅ Firestore에서 posts 컬렉션 가져오기
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("✅ Firestore에서 불러온 게시글 목록:", posts);
    return posts;
  } catch (error) {
    console.error("❌ Firestore 데이터 불러오기 오류:", error);
    return [];
  }
};

// ✅ Firestore에 새 게시글 추가
export const addPost = async (title, content, author = "관리자") => {
  try {
    console.log("🔥 addPost 실행됨!"); // ✅ 실행 로그
    console.log("📌 저장할 데이터:", { title, content, author });

    const docRef = await addDoc(collection(db, "posts"), {
      title,
      content,
      author,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Firestore에 저장 완료! ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Firestore 저장 오류:", error);
  }
};

import { db } from "./firebase"; // ✅ Firebase 초기화 파일
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

// ✅ Firestore에서 모든 게시물 가져오기
export const fetchPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ✅ Firestore에 새 게시물 추가
export const addPost = async (title, content) => {
  await addDoc(collection(db, "posts"), {
    title,
    content,
    createdAt: serverTimestamp(),
  });
};

// ✅ Firestore에서 특정 게시물 삭제
export const deletePost = async (postId) => {
  await deleteDoc(doc(db, "posts", postId));
};

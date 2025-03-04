import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // ✅ Firebase 초기화 파일 import

// ✅ 게시글 추가 (Create)
export const addPost = async (title, content, author = "익명") => {
  try {
    const docRef = await addDoc(collection(db, "networkPosts"), {
      title,
      content,
      author,
      date: serverTimestamp(), // Firestore 서버 시간 사용
      likes: 0,
      comments: 0,
      thumbnail: "/assets/Component_MainContent_NoImage.jpg"
    });
    console.log("Firestore 저장 성공! 문서 ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("게시글 추가 실패:", error);
    return null;
  }
};

// ✅ 게시글 조회 (Read)
export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "networkPosts"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("게시글 불러오기 실패:", error);
    return [];
  }
};

// ✅ 게시글 수정 (Update)
export const updatePost = async (postId, newTitle, newContent) => {
  try {
    const postRef = doc(db, "networkPosts", postId);
    await updateDoc(postRef, {
      title: newTitle,
      content: newContent,
      date: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    return false;
  }
};

// ✅ 게시글 삭제 (Delete)
export const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, "networkPosts", postId));
    return true;
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    return false;
  }
};

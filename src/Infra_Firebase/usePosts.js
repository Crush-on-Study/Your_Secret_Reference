import { useState, useEffect } from "react";
import { fetchPosts, addPost } from "./firebaseCRUD"; // ✅ Firestore CRUD 함수 가져오기

const usePosts = () => {
  const [posts, setPosts] = useState([]);  // ✅ 초기값을 빈 배열([])로 설정

  useEffect(() => {
    console.log("🔥 Firestore 실시간 데이터 가져오는 중...");

    // ✅ Firestore 구독 시작
    const unsubscribe = fetchPosts((data) => {
      console.log("✅ Firestore에서 불러온 게시글:", data);
      setPosts(data || []); // ✅ undefined 방지
    });

    // ✅ 컴포넌트 언마운트 시 구독 해제
    return () => {
      console.log("🛑 Firestore 구독 해제됨!");
      unsubscribe(); 
    };
  }, []);

  // ✅ 새 게시글 추가 함수
  const addNewPost = async (title, content) => {
    console.log("📌 addNewPost 실행! 제목:", title);
    const newPostId = await addPost(title, content);

    if (newPostId) {
      const newPost = { id: newPostId, title, content };
      setPosts((prevPosts) => [...prevPosts, newPost]); 
    }
  };

  return { posts, addNewPost };
};

export default usePosts;

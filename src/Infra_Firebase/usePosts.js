import { useState, useEffect } from "react";
import { fetchPosts } from "./firebaseCRUD"; // Firestore CRUD 함수 가져오기

const usePosts = (category) => {
  const [posts, setPosts] = useState([]);  

  useEffect(() => {
    console.log(`🔥 Firestore에서 ${category} 게시글 불러오는 중...`);

    // ✅ Firestore 구독 시작
    const unsubscribe = fetchPosts(category, (data) => {
      console.log("✅ Firestore에서 불러온 게시글:", data);
      setPosts(data || []); 
    });

    // ✅ 컴포넌트 언마운트 시 Firestore 구독 해제
    return () => {
      console.log("🛑 Firestore 구독 해제됨!");
      unsubscribe(); 
    };
  }, [category]);

  return { posts };
};

export default usePosts;

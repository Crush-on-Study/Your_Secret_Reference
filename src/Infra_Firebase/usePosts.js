import { useState, useEffect } from "react";
import { fetchPosts, addPost } from "./firebaseCRUD"; // ✅ Firestore CRUD 함수 가져오기

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      console.log("🔥 Firestore에서 데이터 가져오는 중...");
      const data = await fetchPosts();
      console.log("✅ Firestore에서 불러온 데이터:", data);
      setPosts(data);
    };

    getPosts();
  }, []);

  // ✅ 새 게시글 추가 함수
  const addNewPost = async (title, content) => {
    console.log("📌 addNewPost 실행! 제목:", title);
    const newPostId = await addPost(title, content);
    
    if (newPostId) {
      const newPost = { id: newPostId, title, content };
      setPosts([...posts, newPost]); // ✅ Firestore에 저장한 후 로컬 상태 업데이트
    }
  };

  return { posts, addNewPost };
};

export default usePosts;

import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

const usePosts = (category) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setError("카테고리가 지정되지 않았습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const postsRef = collection(db, category);
    const unsubscribe = onSnapshot(
      postsRef,
      (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt
              ? data.createdAt.toDate().toLocaleString("ko-KR")
              : "날짜 없음",
          };
        });
        setPosts(fetchedPosts);
        setIsLoading(false);
      },
      (err) => {
        console.error("onSnapshot 오류:", err);
        setError(err.message || "게시글을 불러오는 데 실패했습니다.");
        setPosts([]);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [category]);

  return { posts, isLoading, error };
};

export default usePosts;
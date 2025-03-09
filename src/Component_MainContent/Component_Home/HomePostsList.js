import React, { useState, useEffect } from "react";
import { fetchAllPosts } from "../../Infra_Firebase/firebaseCRUD"; // ✅ Firestore에서 모든 게시글 가져오기
import "./HomePostsList.css"; // ✅ 스타일 파일

const HomePostsList = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentComments, setRecentComments] = useState([]); // ✅ 더미 데이터

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await fetchAllPosts();

      // ✅ 최근 글 (최신순 정렬)
      const sortedRecent = [...allPosts].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

      // ✅ 인기 글 (조회수 높은 순 정렬)
      const sortedPopular = [...allPosts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

      setRecentPosts(sortedRecent);
      setPopularPosts(sortedPopular);
    };

    fetchData();

    // ✅ 더미 데이터 (최근 댓글)
    setRecentComments([
      { id: "c1", content: "좋은 글이네요!", author: "user1", createdAt: "1일 전" },
      { id: "c2", content: "도움이 많이 되었습니다!", author: "user2", createdAt: "3일 전" },
      { id: "c3", content: "질문이 있는데...", author: "user3", createdAt: "5일 전" },
    ]);
  }, []);

  return (
    <div className="home-posts-container">
      <div className="posts-section">
        <h3>📌 최근 글</h3>
        <ul>
          {recentPosts.map((post) => (
            <li key={post.id}>
              <a href={`/${post.category}/${post.id}`}>{post.title}</a> - {post.createdAt}
            </li>
          ))}
        </ul>
      </div>

      <div className="posts-section">
        <h3>🔥 인기 글</h3>
        <ul>
          {popularPosts.map((post) => (
            <li key={post.id}>
              <a href={`/${post.category}/${post.id}`}>{post.title}</a> - 조회수: {post.views || 0}
            </li>
          ))}
        </ul>
      </div>

      <div className="posts-section">
        <h3>💬 최근 댓글</h3>
        <ul>
          {recentComments.map((comment) => (
            <li key={comment.id}>
              {comment.author}: "{comment.content}" - {comment.createdAt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePostsList;

import React, { useState, useEffect } from "react";
import { fetchAllPosts } from "../../Infra_Firebase/firebaseFunctions";
import "./HomePostsList.css";

const HomePostsList = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchAllPosts();
        if (result.success) {
          const allPosts = result.data || [];

          // 최근 글 (최신순 정렬)
          const sortedRecent = [...allPosts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

          // 인기 글 (조회수 높은 순 정렬)
          const sortedPopular = [...allPosts]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);

          setRecentPosts(sortedRecent);
          setPopularPosts(sortedPopular);
        } else {
          throw new Error(result.error || "게시글을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("fetchAllPosts 오류:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }

      // 더미 데이터 (최근 댓글)
      setRecentComments([
        { id: "c1", content: "좋은 글이네요!", author: "user1", createdAt: "1일 전" },
        { id: "c2", content: "도움이 많이 되었습니다!", author: "user2", createdAt: "3일 전" },
        { id: "c3", content: "질문이 있는데...", author: "user3", createdAt: "5일 전" },
      ]);
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div style={{ color: "red" }}>에러: {error}</div>;

  return (
    <div className="home-posts-container">
      <div className="posts-section">
        <h3>📌 최근 글</h3>
        <ul>
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post.id}>
                <a href={`/${post.category}/${post.id}`}>{post.title}</a> - {post.createdAt}
              </li>
            ))
          ) : (
            <li>최근 글이 없습니다.</li>
          )}
        </ul>
      </div>

      <div className="posts-section">
        <h3>🔥 인기 글</h3>
        <ul>
          {popularPosts.length > 0 ? (
            popularPosts.map((post) => (
              <li key={post.id}>
                <a href={`/${post.category}/${post.id}`}>{post.title}</a> - 조회수: {post.views || 0}
              </li>
            ))
          ) : (
            <li>인기 글이 없습니다.</li>
          )}
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
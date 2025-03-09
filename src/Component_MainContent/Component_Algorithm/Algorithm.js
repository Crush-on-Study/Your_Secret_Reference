import React, { useState } from "react";
import usePosts from "../../Infra_Firebase/usePosts";
import useAuth from "../../Infra_Firebase/useAuth";
import PostEditor from "../../Component_Common/PostEditor";
import "./Algorithm.css";

const DEFAULT_IMAGE = "/assets/Component_MainContent_NoImage.jpg"; // ✅ 기본 이미지
const CATEGORY = "AlgorithmPosts"; // ✅ Firestore 컬렉션명 변경

const Algorithm = () => {
  const { posts, addNewPost } = usePosts(CATEGORY);
  const { isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // ✅ 페이지네이션 계산
  const totalPages = Math.ceil((posts.length || 0) / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost) || [];

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // ✅ 새 게시글 추가 후 실행될 함수 (UI 업데이트)
  const handlePostAdded = async () => {
    setIsEditorOpen(false); // 에디터 닫기
  };

  return (
    <div className="algorithm-system-page">
      <h2>🖥️ 알고리즘 게시판</h2>

      {/* ✅ 관리자만 "새 글 등록" 버튼 표시 */}
      {isAdmin && (
        <button
          className="new-post-button"
          onClick={() => setIsEditorOpen(!isEditorOpen)}
        >
          {isEditorOpen ? "✖ 닫기" : "✍ 새 글 등록"}
        </button>
      )}

      {/* ✅ 글쓰기 에디터 (관리자만 가능) */}
      {isAdmin && isEditorOpen && <PostEditor category={CATEGORY} onPostAdded={handlePostAdded} />}

      {/* ✅ 게시글 리스트 출력 */}
      <div className="post-list">
        {currentPosts.map((post) => (
          <div key={post.id} className="post-item">
            <img 
              src={post.thumbnail || DEFAULT_IMAGE} 
              alt={post.title} 
              className="post-thumbnail" 
            />
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">
                {post.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 100)}...
              </p>
              <div className="post-info">
                <span>{post.author || "익명"}</span> · <span>{post.createdAt || "날짜 없음"}</span>
              </div>
              <div className="post-stats">
                👍 {post.likes || 0} | 💬 {post.comments || 0}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ 페이지네이션 UI */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          &lt; Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Algorithm;

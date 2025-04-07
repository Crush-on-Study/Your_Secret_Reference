import React, { useState } from "react";
import usePosts from "../Infra_Firebase/usePosts";
import useAuth from "../Infra_Firebase/useAuth";
import PostEditor from "./PostEditor";
import Pagination from "./Pagination";
import "./PostBoard.css";
import "./Post_Btn.css";

const DEFAULT_IMAGE = "/assets/Component_MainContent_NoImage.jpg";

const PostBoard = ({ title, category }) => {
  const { posts, isLoading, error } = usePosts(category);
  const { isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePostAdded = () => {
    setIsEditorOpen(false);
  };

  return (
    <div className="post-board-page">
      <h2>{title}</h2>

      {isAdmin && (
        <button
          className="new-post-button"
          onClick={() => setIsEditorOpen(!isEditorOpen)}
        >
          {isEditorOpen ? "✖ 닫기" : "✍ 새 글 등록"}
        </button>
      )}

      {isAdmin && isEditorOpen && (
        <PostEditor category={category} onPostAdded={handlePostAdded} />
      )}

      {isLoading && <div>로딩 중...</div>}
      {error && <div style={{ color: "red" }}>에러: {error}</div>}

      <div className="post-list">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
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
                  <span>{post.author || "익명"}</span> ·{" "}
                  <span>{post.createdAt || "날짜 없음"}</span>
                </div>
                <div className="post-stats">
                  👍 {post.likes || 0} | 💬 {post.comments || 0}
                </div>
              </div>
            </div>
          ))
        ) : (
          !isLoading && !error && <div>게시글이 없습니다.</div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PostBoard;
import React, { useState } from "react";
import usePosts from "../Infra_Firebase/usePosts";
import useAuth from "../Infra_Firebase/useAuth";
import PostEditor from "./PostEditor";
import Pagination from "./Pagination";
import "./PostBoard.css";
import "./Post_Btn.css"; // 새 글 등록 버튼 스타일 import

const DEFAULT_IMAGE = "/assets/Component_MainContent_NoImage.jpg";

const PostBoard = ({ category, title }) => {
  const { posts, addNewPost } = usePosts(category); // TODO: Firebase Functions로 변경 예정
  const { isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const postsPerPage = 10;

  // 페이지네이션 계산
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

  const handlePostAdded = async () => {
    setIsEditorOpen(false);
  };

  return (
    <div className="post-board-page">
      <h2>{title}</h2>

      {/* 관리자용 "새 글 등록" 버튼 */}
      {isAdmin && (
        <button
          className="new-post-button"
          onClick={() => setIsEditorOpen(!isEditorOpen)}
        >
          {isEditorOpen ? "✖ 닫기" : "✍ 새 글 등록"}
        </button>
      )}

      {/* 글쓰기 에디터 */}
      {isAdmin && isEditorOpen && (
        <PostEditor category={category} onPostAdded={handlePostAdded} />
      )}

      {/* 게시글 리스트 */}
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
                <span>{post.author || "익명"}</span> ·{" "}
                <span>{post.createdAt || "날짜 없음"}</span>
              </div>
              <div className="post-stats">
                👍 {post.likes || 0} | 💬 {post.comments || 0}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
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
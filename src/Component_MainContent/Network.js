import React, { useState } from "react";
import usePosts from "../Infra_Firebase/usePosts";
import useAuth from "../Infra_Firebase/useAuth";
import PostEditor from "../Component_Common/PostEditor";
import Pagination from "../Component_Common/Pagination";
import "../../Component_Common/PostBoard.css"; // PostBoard.css import
import "../../Component_Common/Post_Btn.css";

const DEFAULT_IMAGE = "/assets/Component_MainContent_NoImage.jpg"; // ✅ 기본 이미지
const CATEGORY = "NetworkPosts"; // ✅ Firestore 컬렉션명 (각 게시판별 변경 필요)

const Network = () => {
  const { posts, addNewPost } = usePosts(CATEGORY);
  const { isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const safePosts = posts || [];
  const totalPages = Math.ceil(safePosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = safePosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePostAdded = async (newPost) => {
    await addNewPost(newPost);
    setIsEditorOpen(false);
  };

  return (
    <div className="post-board-page"> {/* PostBoard.css의 클래스 사용 */}
      <h2>🖥️ 프론트엔드 게시판</h2>

      {isAdmin && (
        <button
          className="new-post-button"
          onClick={() => setIsEditorOpen(!isEditorOpen)}
        >
          {isEditorOpen ? "✖ 닫기" : "✍ 새 글 등록"}
        </button>
      )}

      {isAdmin && isEditorOpen && (
        <PostEditor category={CATEGORY} onPostAdded={handlePostAdded} />
      )}

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

export default Network;

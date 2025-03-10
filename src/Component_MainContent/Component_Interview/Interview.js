import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePosts from "../../Infra_Firebase/usePosts";
import useAuth from "../../Infra_Firebase/useAuth";
import PostEditor from "../../Component_Common/PostEditor";
import "./Interview.css";

const DEFAULT_IMAGE = "/assets/Component_MainContent_NoImage.jpg";
const CATEGORY = "RealInterviewPosts";

const Interview = () => {
  const { posts } = usePosts(CATEGORY);
  const { isAdmin } = useAuth();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const navigate = useNavigate();

  if (!posts) return <p>로딩 중...</p>;

  return (
    <div className="interview-page">
      <h2>📡 실제 면접 후기 게시판</h2>

      {isAdmin && (
        <button className="new-post-button" onClick={() => setIsEditorOpen(!isEditorOpen)}>
          {isEditorOpen ? "✖ 닫기" : "✍ 새 글 등록"}
        </button>
      )}

      {isAdmin && isEditorOpen && <PostEditor category={CATEGORY} />}

      <div className="post-list">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="post-item"
            onClick={() => navigate(`/interview/post/${post.id}`)} // ✅ 클릭 시 상세 페이지 이동
          >
            <img src={post.thumbnail || DEFAULT_IMAGE} alt="썸네일" className="post-thumbnail" />
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">
                {post.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 100)}...
              </p>
              <div className="post-info">
                <span>{post.author || "익명"}</span> · <span>{post.createdAt || "날짜 없음"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interview;

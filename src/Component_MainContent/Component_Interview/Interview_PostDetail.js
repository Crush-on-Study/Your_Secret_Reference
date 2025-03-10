import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../../Infra_Firebase/firebaseCRUD";
import "./Interview.css";

const Interview_PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가

  useEffect(() => {
    getPostById("RealInterviewPosts", postId).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [postId]);

  if (loading) return <p>⏳ 게시글을 불러오는 중...</p>;
  if (!post) return <p>❌ 게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="post-detail-container">
      <button onClick={() => navigate(-1)}>🔙 목록으로</button>
      <h2>{post.title}</h2>
      
      <div className="post-meta">
        <span className="author">{post.author || "익명"}</span>
        <span className="date">{post.createdAt}</span>
      </div>

      {post.thumbnail && <img src={post.thumbnail} alt="썸네일" className="post-thumbnail-large" />}
      
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
};

export default Interview_PostDetail;

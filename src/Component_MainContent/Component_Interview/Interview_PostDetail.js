import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, addPost, deletePost } from "../../Infra_Firebase/firebaseFunctions";
import useAuth from "../../Infra_Firebase/useAuth";
import PostEditor from "../../Component_Common/PostEditor";
import "./Interview.css";

const Interview_PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getPostById("RealInterviewPosts", postId);
        if (result.success) {
          setPost(result.data);
        } else {
          throw new Error(result.error || "게시글을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("게시글 로드 오류:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        // 삭제된 게시글을 deletedPosts 컬렉션에 저장 후 원본 삭제
        const addResult = await addPost(
          "deletedPosts",
          post.title,
          post.content,
          post.author,
          post.thumbnail
        );
        if (!addResult.success) {
          throw new Error(addResult.error || "삭제된 게시글 저장 실패");
        }

        const deleteResult = await deletePost("RealInterviewPosts", postId);
        if (deleteResult.success) {
          alert("게시글이 삭제되었습니다! (복구 가능)");
          navigate("/interview");
        } else {
          throw new Error(deleteResult.error || "게시글 삭제 실패");
        }
      } catch (error) {
        console.error("삭제 오류:", error);
        alert(error.message || "게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return <p>⏳ 게시글을 불러오는 중...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;
  if (!post) return <p>❌ 게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="post-detail-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <button onClick={() => navigate(-1)}>🔙 목록으로</button>
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span className="author">{post.author || "익명"}</span>
        <span className="date">{post.createdAt}</span>
      </div>
      {post.thumbnail && <img src={post.thumbnail} alt="썸네일" className="post-thumbnail-large" />}
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>

      {isAdmin && !isEditing && (
        <div className="button-group">
          <button className="edit-button" onClick={() => setIsEditing(true)}>✏ 글 수정하기</button>
          <button className="delete-button" onClick={handleDelete}>🗑 글 삭제하기</button>
        </div>
      )}

      {isEditing && (
        <PostEditor
          category="RealInterviewPosts"
          post={post}
          onPostUpdated={() => {
            setIsEditing(false);
            getPostById("RealInterviewPosts", postId).then((result) => {
              if (result.success) setPost(result.data);
            });
          }}
          onPostDeleted={() => navigate("/interview")}
        />
      )}
    </div>
  );
};

export default Interview_PostDetail;
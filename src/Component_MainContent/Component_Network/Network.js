import React, { useState, useEffect } from "react";
import { getPosts, addPost } from "../../Infra_Firebase/firebaseCRUD"; // ✅ Firestore CRUD 함수 사용
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Network.css";

const Network = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // ✅ Firestore에서 게시글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  // ✅ Firestore에 글 저장
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    const newPostId = await addPost(
      title,
      content,
      "익명",
      "/assets/default-thumbnail.jpg" // 기본 썸네일
    );

    if (newPostId) {
      alert("게시글이 등록되었습니다!");
      setPosts([{ id: newPostId, title, content, author: "익명", date: new Date().toISOString().split("T")[0], likes: 0, comments: 0, thumbnail: "/assets/default-thumbnail.jpg" }, ...posts]);
      setTitle("");
      setContent("");
    }
  };

  // ✅ 페이지네이션
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

  return (
    <div className="network-page">
      <h2>📡 네트워크 게시판</h2>

      {/* ✅ 게시글 작성 폼 */}
      <div className="add-post-form">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          className="quill-editor"
          placeholder="내용을 입력하세요..."
        />
        <button onClick={handleSubmit}>게시글 등록</button>
      </div>

      {/* ✅ 게시글 리스트 */}
      <div className="post-list">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className="post-item">
              <img src={post.thumbnail || "/assets/default-thumbnail.jpg"} alt={post.title} className="post-thumbnail" />
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.content.replace(/<[^>]+>/g, '')}</p>
                <div className="post-info">
                  <span>{post.author}</span> · <span>{post.date}</span>
                </div>
                <div className="post-stats">
                  👍 {post.likes} | 💬 {post.comments}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">등록된 게시글이 없습니다.</p>
        )}
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

export default Network;

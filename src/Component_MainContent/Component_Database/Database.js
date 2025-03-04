import React, { useState } from "react";
import "./Database.css";

// Firebase
// import { db } from "../../firebase";

const dummyPosts = [
  {
    id: 1,
    title: "HTTP vs HTTPS: 네트워크 보안 차이점",
    description: "웹에서 데이터를 안전하게 주고받는 HTTPS의 중요성을 알아봅니다.",
    author: "네트워크 마스터",
    date: "2024-03-04",
    likes: 184,
    comments: 16,
    thumbnail: "/assets/dummy1.jpg",
  },
  {
    id: 2,
    title: "TCP vs UDP: 언제 어떤 프로토콜을 사용할까?",
    description: "속도와 신뢰성의 차이를 비교하고, 어떤 상황에서 TCP와 UDP를 선택해야 하는지 알아봅니다.",
    author: "CS 스페셜리스트",
    date: "2024-03-03",
    likes: 232,
    comments: 8,
    thumbnail: "/assets/dummy2.webp",
  },
];

const Network = () => {
   // const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // 페이지네이션 처리
  const totalPages = Math.ceil(dummyPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dummyPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="network-page">
      <h2>📡 네트워크 게시판</h2>
      <div className="post-list">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className="post-item">
              <img src={post.thumbnail} alt={post.title} className="post-thumbnail" />
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>
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

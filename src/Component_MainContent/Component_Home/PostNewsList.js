import React from "react";
import "./PostNewsList.css";

const PostNewsList = () => {
  // 더미 데이터
  const recentPosts = [
    { title: "[더미데이터1] 비트코인 드가자", date: "2025.03.07" },
    { title: "[더미데이터2] 🧪 롤 드가자", date: "2025.02.24" },
    { title: "[더미데이터3] 🖥️ 맥북 왜이리 비쌈", date: "2023.05.15" },
  ];

  const recentComments = [
    { user: "코린이", comment: "롤 ㄱㄱ" },
    { user: "코린이2", comment: "쌌다" },
    { user: "코린이3", comment: "지렸다..." },
  ];

  const itNews = [
    { title: "🔒 딥시크? 사용하는게 맞나?", date: "2022.11.28" },
    { title: "💡 챗지피티의 보안성", date: "2022.02.04" },
    { title: "⚡ 취업시장 개박살", date: "2022.07.19" },
  ];

  return (
    <div className="post-news-container">
      <div className="post-news-content">
        {/* 최근 댓글 */}
        <div className="section">
          <h3>최근 댓글 <span className="new-badge">new</span></h3>
          <ul>
            {recentComments.map((item, index) => (
              <li key={index}>
                <span className="user">{item.user}</span> {item.comment}
              </li>
            ))}
          </ul>
        </div>

        {/* 최근 글 */}
        <div className="section">
          <h3>최근 글 <span className="new-badge">new</span></h3>
          <ul>
            {recentPosts.map((item, index) => (
              <li key={index}>
                <span className="post-title">{item.title}</span>
                <span className="date">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* IT 뉴스 */}
        <div className="section">
          <h3>IT 뉴스</h3>
          <ul>
            {itNews.map((item, index) => (
              <li key={index}>
                <span className="news-title">{item.title}</span>
                <span className="date">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostNewsList;

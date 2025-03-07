// import React, { useState } from "react";
// import usePosts from "../../Infra_Firebase/usePosts"; // ✅ Firebase Hook 사용
// import PostEditor from "../../Component_Common/PostEditor"; // ✅ 공통 에디터 컴포넌트
// import "./OperatingSystem.css";
// import "../../Component_Common/Editor.css";

// const OperatingSystem = () => {
//   const { posts, addNewPost } = usePosts();
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;

//   // ✅ 페이지네이션 로직
//   const totalPages = Math.ceil(posts.length / postsPerPage);
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   return (
//     <div className="OperatingSystem-page">
//       <h2>📡 CS이론 : 운영체제 </h2>

//       {/* ✅ 공통 에디터 사용 */}
//       <PostEditor onSubmit={addNewPost} />

//       {/* ✅ 게시글 리스트 */}
//       <div className="post-list">
//         {currentPosts.length > 0 ? (
//           currentPosts.map((post) => (
//             <div key={post.id} className="post-item">
//               <img src={post.thumbnail || "/assets/default-thumbnail.jpg"} alt={post.title} className="post-thumbnail" />
//               <div className="post-content">
//                 <h3 className="post-title">{post.title}</h3>
//                 <p className="post-description">{post.content.replace(/<[^>]+>/g, '')}</p>
//                 <div className="post-info">
//                   <span>{post.author}</span> · <span>{post.date}</span>
//                 </div>
//                 <div className="post-stats">
//                   👍 {post.likes} | 💬 {post.comments}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           // ✅ 글이 없을 때 표시
//           <div className="empty-container">
//             <img src="/assets/no-posts.png" alt="게시글 없음" className="empty-image" />
//             <p className="empty-message">등록된 게시글이 없습니다.</p>
//           </div>
//         )}
//       </div>

//       {/* ✅ 페이지네이션 UI */}
//       {totalPages > 1 && (
//         <div className="pagination">
//           <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//             &lt; Previous
//           </button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
//               {i + 1}
//             </button>
//           ))}
//           <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
//             Next &gt;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OperatingSystem;



import React from "react";
import { addPost } from "../../Infra_Firebase/firebaseCRUD";

const TestComponent = () => {
  const handleAddPost = async () => {
    const postId = await addPost("첫 번째 게시글", "이것은 테스트 게시글입니다!");
    alert(`게시글이 추가되었습니다! ID: ${postId}`);
  };

  return (
    <div>
      <h2>Firebase Firestore 테스트</h2>
      <button onClick={handleAddPost}>게시글 추가</button>
    </div>
  );
};

export default TestComponent;

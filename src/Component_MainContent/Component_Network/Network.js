import React, { useState, useEffect } from "react";
import usePosts from "../../Infra_Firebase/usePosts";
import useAuth from "../../Infra_Firebase/useAuth"; // ✅ 관리자 인증 추가
import PostEditor from "../../Component_Common/PostEditor";
import Pagination from "../../Component_Common/Pagination";
import "./Network.css";

const Network = () => {
  const { posts, addNewPost } = usePosts();
  const { user, isAdmin } = useAuth(); // ✅ Firestore에서 관리자 여부 확인
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setLoading(false); // ✅ 로그인 상태가 확인되면 로딩 종료
    }
  }, [user, isAdmin]);

  console.log("🔥 현재 로그인한 사용자:", user);
  console.log("🛠️ 관리자 여부:", isAdmin);

  return (
    <div className="Network-page">
      <h2>📡 네트워크 이론</h2>

      {/* ✅ 로그인 상태 로딩 중 */}
      {loading ? (
        <p className="loading-message">🔄 로그인 상태 확인 중...</p>
      ) : (
        <>
          {/* ✅ 관리자만 글 작성 가능 */}
          {isAdmin ? (
            <PostEditor onSubmit={addNewPost} />
          ) : (
            <p className="access-denied">❌ 관리자만 글을 작성할 수 있습니다.</p>
          )}

          {/* ✅ 게시글 리스트 */}
          <div className="post-list">
            {posts.length > 0 ? (
              posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post) => (
                <div key={post.id}>
                  <h3>{post.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              ))
            ) : (
              <p className="empty-message">게시글이 없습니다.</p>
            )}
          </div>

          {/* ✅ 페이지네이션 UI */}
          <Pagination currentPage={currentPage} totalPages={Math.ceil(posts.length / postsPerPage)} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default Network;

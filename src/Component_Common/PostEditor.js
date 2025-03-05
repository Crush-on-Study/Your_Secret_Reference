// 에디터 컴포넌트
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css"; // ✅ 공통 스타일 적용

const PostEditor = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showEditor, setShowEditor] = useState(false); // ✅ 에디터 표시 여부

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }
    onSubmit(title, content);
    setTitle("");
    setContent("");
    setShowEditor(false);
  };

  return (
    <div className="post-editor">
      {/* "새 글 작성" 버튼 */}
      <button className="new-post-btn" onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? "닫기" : "새 글 작성 ✍️"}
      </button>

      {/* ✅ 에디터는 버튼을 눌렀을 때만 표시 */}
      {showEditor && (
        <div className="editor-container">
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
      )}
    </div>
  );
};

export default PostEditor;

import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ✅ Quill 스타일 가져오기
import "./Editor.css"; // ✅ 에디터 스타일
import { ThemeContext } from "../Component_Common/ThemeContext"; // ✅ 다크모드 적용

const PostEditor = ({ onSubmit }) => {
  const { isDarkMode } = useContext(ThemeContext); // ✅ 다크모드 감지
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const trimmedContent = content.replace(/<p><br><\/p>/g, "").trim();

    if (!title.trim() || !trimmedContent) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className={`editor-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        className="quill-editor"
        theme="snow"
      />
      <button onClick={handleSubmit} className="submit-button">
        새 글 등록
      </button>
    </div>
  );
};

export default PostEditor;

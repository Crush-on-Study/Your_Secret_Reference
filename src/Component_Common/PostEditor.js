import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ✅ Quill 스타일 가져오기
import "./Editor.css"; // ✅ 에디터 스타일
import { ThemeContext } from "../Component_Common/ThemeContext"; // ✅ 다크모드 적용
import { addPost } from "../Infra_Firebase/firebaseCRUD"; // ✅ Firestore 저장 함수 가져오기

const PostEditor = ({ category, onPostAdded }) => {
  const { isDarkMode } = useContext(ThemeContext); // ✅ 다크모드 감지
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const trimmedContent = content.replace(/<p><br><\/p>/g, "").trim();

    if (!title.trim() || !trimmedContent) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      // ✅ Firestore에 글 저장
      await addPost(category, title, content, "관리자");
      alert("게시글이 등록되었습니다!");

      // ✅ 입력 필드 초기화
      setTitle("");
      setContent("");

      // ✅ 부모 컴포넌트에 게시글 추가 알림 (UI 업데이트)
      if (onPostAdded) {
        onPostAdded();
      }
    } catch (error) {
      console.error("❌ 게시글 저장 오류:", error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    }
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

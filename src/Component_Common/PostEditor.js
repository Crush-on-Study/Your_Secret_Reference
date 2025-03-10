import React, { useState, useContext } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import { ThemeContext } from "../Component_Common/ThemeContext";
import { addPost, updatePost, deletePost } from "../Infra_Firebase/firebaseCRUD";

// ✅ 추가 모듈 등록
import ImageResize from "quill-image-resize-module-react";
import * as ImageDrop from "quill-image-drop-module";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop.ImageDrop);

const PostEditor = ({ category, post, onPostUpdated, onPostDeleted }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [title, setTitle] = useState(post ? post.title : ""); // ✅ 기존 글 제목 유지
  const [content, setContent] = useState(post ? post.content : ""); // ✅ 기존 글 내용 유지

  const isEditing = !!post; // ✅ 수정 중인지 여부 확인

  // ✅ 게시글 저장 또는 수정 함수
  const handleSubmit = async () => {
    const trimmedContent = content.replace(/<p><br><\/p>/g, "").trim();
    if (!title.trim() || !trimmedContent) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      if (isEditing) {
        // ✅ 게시글 수정
        await updatePost(category, post.id, content);
        alert("게시글이 수정되었습니다!");
        if (onPostUpdated) onPostUpdated();
      } else {
        // ✅ 새 게시글 추가
        await addPost(category, title, content, "관리자");
        alert("게시글이 등록되었습니다!");
      }

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("❌ 오류 발생:", error);
      alert("작업 중 오류가 발생했습니다.");
    }
  };

  // ✅ 게시글 삭제 함수
  const handleDelete = async () => {
    if (!post) return;
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deletePost(category, post.id);
        alert("게시글이 삭제되었습니다!");
        if (onPostDeleted) onPostDeleted();
      } catch (error) {
        console.error("❌ 삭제 오류:", error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // ✅ Quill 툴바 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
    imageResize: {
      displaySize: true,
    },
    imageDrop: true,
  };

  return (
    <div className={`editor-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
        disabled={isEditing} // ✅ 수정 시 제목 변경 불가
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        className="quill-editor"
        theme="snow"
        modules={modules}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "blockquote",
          "color",
          "background",
          "list",
          "bullet",
          "link",
          "image",
          "align",
        ]}
      />
      <div className="button-group">
        <button onClick={handleSubmit} className="submit-button">
          {isEditing ? "수정 완료" : "새 글 등록"}
        </button>
        {isEditing && (
          <button onClick={handleDelete} className="delete-button">
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default PostEditor;

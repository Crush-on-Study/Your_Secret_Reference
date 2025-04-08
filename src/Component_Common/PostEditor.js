import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import { ThemeContext } from "./ThemeContext";
import { addPost, updatePost, deletePost, uploadImage } from "../Infra_Firebase/firebaseFunctions";

const PostEditor = ({ category, post, onPostUpdated, onPostDeleted, onPostAdded }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const isEditing = !!post;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    return new Promise((resolve) => {
      input.onchange = async () => {
        const file = input.files[0];
        if (file) {
          try {
            // 파일을 Base64로 인코딩
            const reader = new FileReader();
            const base64Promise = new Promise((resolve) => {
              reader.onloadend = () => resolve(reader.result.split(",")[1]);
              reader.readAsDataURL(file);
            });
            const base64Data = await base64Promise;

            const result = await uploadImage(base64Data, file.name);
            if (result.success) {
              resolve(result.url);
            } else {
              throw new Error(result.error || "이미지 업로드 실패");
            }
          } catch (error) {
            console.error("이미지 업로드 오류:", error);
            resolve(null);
          }
        }
      };
    });
  };

  const handleSubmit = async () => {
    const trimmedContent = content.replace(/<p><br><\/p>/g, "").trim();
    if (!title.trim() || !trimmedContent) {
      setError("제목과 내용을 입력해주세요.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      let thumbnailUrl = "";
      if (thumbnail) {
        // 파일을 Base64로 인코딩
        const reader = new FileReader();
        const base64Promise = new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.readAsDataURL(thumbnail);
        });
        const base64Data = await base64Promise;

        const result = await uploadImage(base64Data, thumbnail.name);
        if (result.success) {
          thumbnailUrl = result.url;
        } else {
          throw new Error(result.error || "이미지 업로드 실패");
        }
      }

      if (isEditing) {
        // 게시글 수정
        const result = await updatePost(category, post.id, content);
        if (result.success) {
          alert("게시글이 수정되었습니다!");
          if (onPostUpdated) onPostUpdated();
        } else {
          throw new Error(result.error || "게시글 수정 실패");
        }
      } else {
        // 새 게시글 추가
        console.log("addPost 호출 데이터:", { category, title, content, author: "관리자", thumbnailUrl });
        const result = await addPost(category, title, content, "관리자", thumbnailUrl);
        if (result.success) {
          alert("게시글이 등록되었습니다!");
          if (onPostAdded) onPostAdded();
        } else {
          throw new Error(result.error || "게시글 추가 실패");
        }
      }

      setTitle("");
      setContent("");
      setThumbnail(null);
    } catch (err) {
      console.error("❌ 오류 발생:", err);
      setError(err.message || "작업 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const result = await deletePost(category, post.id);
        if (result.success) {
          alert("게시글이 삭제되었습니다!");
          if (onPostDeleted) onPostDeleted();
        } else {
          throw new Error(result.error || "게시글 삭제 실패");
        }
      } catch (error) {
        console.error("❌ 삭제 오류:", error);
        setError(error.message || "게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ align: [] }],
        ["clean"],
      ],
      handlers: {
        image: async () => {
          const url = await handleImageUpload();
          if (url) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", url);
          }
        },
      },
    },
  };

  const quillRef = React.useRef(null);

  return (
    <div className={`editor-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
        disabled={isEditing}
      />
      <ReactQuill
        ref={quillRef}
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
      {!isEditing && (
        <div>
          <label>썸네일</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      )}
      <div className="button-group">
        <button onClick={handleSubmit} className="submit-button" disabled={isUploading}>
          {isUploading ? "처리 중..." : isEditing ? "수정 완료" : "새 글 등록"}
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
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase";

// Firebase Functions 인스턴스 생성 (지역 명시)
const functions = getFunctions(app, "asia-northeast3");

/**
 * ✅ 게시글 추가 함수 (서버 호출)
 * @param {string} category - 게시글이 들어갈 컬렉션 이름
 * @param {string} title - 제목
 * @param {string} content - 본문
 * @param {string} author - 작성자 (기본값: 익명)
 * @param {string} thumbnail - 썸네일 이미지 URL
 * @returns {Promise<{ success: boolean, id?: string, error?: string }>}
 */
export const addPost = async (category, title, content, author = "익명", thumbnail = "") => {
  // 데이터 유효성 검사
  if (!category || typeof category !== "string") {
    return { success: false, error: "카테고리가 유효하지 않습니다." };
  }
  if (!title || typeof title !== "string") {
    return { success: false, error: "제목이 유효하지 않습니다." };
  }
  if (!content || typeof content !== "string") {
    return { success: false, error: "본문이 유효하지 않습니다." };
  }
  if (author && typeof author !== "string") {
    return { success: false, error: "작성자가 유효하지 않습니다." };
  }
  if (thumbnail && typeof thumbnail !== "string") {
    return { success: false, error: "썸네일 URL이 유효하지 않습니다." };
  }

  try {
    const fn = httpsCallable(functions, "addPost");
    const result = await fn({ category, title, content, author, thumbnail });
    return result.data;
  } catch (error) {
    console.error("addPost 호출 실패:", error.message, error.details);
    return { success: false, error: error.message || "게시글 추가 중 오류가 발생했습니다." };
  }
};

/**
 * ✅ 게시글 수정 함수 (서버 호출)
 * @param {string} category - 컬렉션 이름
 * @param {string} postId - 수정할 게시글 ID
 * @param {string} updatedContent - 수정된 본문 내용
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const updatePost = async (category, postId, updatedContent) => {
  try {
    const fn = httpsCallable(functions, "updatePost");
    const result = await fn({ category, postId, updatedContent });
    return result.data;
  } catch (error) {
    console.error("updatePost 호출 실패:", error.message, error.details);
    return { success: false, error: error.message || "게시글 수정 중 오류가 발생했습니다." };
  }
};

/**
 * ✅ 게시글 삭제 함수 (서버 호출)
 * @param {string} category - 컬렉션 이름
 * @param {string} postId - 삭제할 게시글 ID
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const deletePost = async (category, postId) => {
  try {
    const fn = httpsCallable(functions, "deletePost");
    const result = await fn({ category, postId });
    return result.data;
  } catch (error) {
    console.error("deletePost 호출 실패:", error.message, error.details);
    return { success: false, error: error.message || "게시글 삭제 중 오류가 발생했습니다." };
  }
};

/**
 * ✅ 게시글 단건 조회 함수 (서버 호출)
 * @param {string} category - 컬렉션 이름
 * @param {string} postId - 조회할 게시글 ID
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export const getPostById = async (category, postId) => {
  try {
    const fn = httpsCallable(functions, "getPostById");
    const result = await fn({ category, postId });
    return { success: true, data: result.data };
  } catch (error) {
    console.error("getPostById 호출 실패:", error.message, error.details);
    return { success: false, error: error.message || "게시글 조회 중 오류가 발생했습니다." };
  }
};

/**
 * ✅ 모든 게시판 글을 통합 조회 (서버 호출)
 * @returns {Promise<{ success: boolean, data?: Array, error?: string }>}
 */
export const fetchAllPosts = async () => {
  try {
    const fn = httpsCallable(functions, "fetchAllPosts");
    const result = await fn();
    return { success: true, data: result.data };
  } catch (error) {
    console.error("fetchAllPosts 호출 실패:", error.message, error.details);
    return { success: false, error: error.message || "게시글 조회 중 오류가 발생했습니다." };
  }
};

/**
 * ✅ 카테고리별 게시글 조회 (서버 호출)
 * @param {string} category - 컬렉션 이름
 * @returns {Promise<{ success: boolean, data?: Array, error?: string }>}
 */
export const fetchPosts = async (category) => {
  try {
    const fn = httpsCallable(functions, "fetchPosts");
    const result = await fn({ category });
    return { success: true, data: result.data };
  } catch (error) {
    console.error("fetchPosts 호출 실패:", error.message, error.details);
    return { success: false, error: error.message || "게시글 조회 중 오류가 발생했습니다." };
  }
};

/**
 * ✅ 이미지 업로드 (서버 호출)
 * @param {string} fileData - Base64로 인코딩된 파일 데이터
 * @param {string} fileName - 파일 이름
 * @returns {Promise<{ success: boolean, url?: string, error?: string }>}
 */
export const uploadImage = async (fileData, fileName) => {
  try {
    const fn = httpsCallable(functions, "uploadImage");
    const result = await fn({ fileData, fileName });
    return result.data;
  } catch (error) {
    console.error("uploadImage 호출 실패:", error.message, error.details);
    return { success: false, error: error.message || "이미지 업로드 중 오류가 발생했습니다." };
  }
};
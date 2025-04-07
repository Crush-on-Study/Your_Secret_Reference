import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase";

// Firebase Functions 인스턴스 생성
const functions = getFunctions(app);

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
  try {
    const fn = httpsCallable(functions, "addPost");
    const result = await fn({ category, title, content, author, thumbnail });
    return result.data; // { success: true, id: ... }
  } catch (error) {
    console.error("addPost 호출 실패:", error);
    return { success: false, error: error.message };
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
    return result.data; // { success: true }
  } catch (error) {
    console.error("updatePost 호출 실패:", error);
    return { success: false, error: error.message };
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
    return result.data; // { success: true }
  } catch (error) {
    console.error("deletePost 호출 실패:", error);
    return { success: false, error: error.message };
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
    return { success: true, data: result.data }; // { id, title, content, ... }
  } catch (error) {
    console.error("getPostById 호출 실패:", error);
    return { success: false, error: error.message };
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
    return { success: true, data: result.data }; // [ { id, title, category, ... }, ... ]
  } catch (error) {
    console.error("fetchAllPosts 호출 실패:", error);
    return { success: false, error: error.message };
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
    return { success: true, data: result.data }; // [ { id, title, content, ... }, ... ]
  } catch (error) {
    console.error("fetchPosts 호출 실패:", error);
    return { success: false, error: error.message };
  }
};
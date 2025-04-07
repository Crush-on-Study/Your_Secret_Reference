import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase"; // Firebase 앱 초기화한 파일

// Firebase Functions 인스턴스 생성
const functions = getFunctions(app);

/**
 * ✅ 게시글 추가 함수 (서버 호출)
 * @param {string} category - 게시글이 들어갈 컬렉션 이름
 * @param {string} title - 제목
 * @param {string} content - 본문
 * @param {string} author - 작성자 (기본값: 익명)
 * @param {string} thumbnail - 썸네일 이미지 URL
 */
export const addPost = async (category, title, content, author = "익명", thumbnail = "") => {
  const fn = httpsCallable(functions, "addPost");
  const result = await fn({ category, title, content, author, thumbnail });
  return result.data; // { success: true, id: ... }
};

/**
 * ✅ 게시글 수정 함수 (서버 호출)
 * @param {string} category - 컬렉션 이름
 * @param {string} postId - 수정할 게시글 ID
 * @param {string} updatedContent - 수정된 본문 내용
 */
export const updatePost = async (category, postId, updatedContent) => {
  const fn = httpsCallable(functions, "updatePost");
  const result = await fn({ category, postId, updatedContent });
  return result.data; // { success: true }
};

/**
 * ✅ 게시글 삭제 함수 (서버 호출)
 * @param {string} category - 컬렉션 이름
 * @param {string} postId - 삭제할 게시글 ID
 */
export const deletePost = async (category, postId) => {
  const fn = httpsCallable(functions, "deletePost");
  const result = await fn({ category, postId });
  return result.data; // { success: true }
};

/**
 * ✅ 게시글 단건 조회 함수 (서버 호출)
 * @param {string} category - 컬렉션 이름
 * @param {string} postId - 조회할 게시글 ID
 */
export const getPostById = async (category, postId) => {
  const fn = httpsCallable(functions, "getPostById");
  const result = await fn({ category, postId });
  return result.data; // { id, title, content, ... }
};

/**
 * ✅ 모든 게시판 글을 통합 조회 (서버 호출)
 * @returns {Array} 게시글 전체 목록
 */
export const fetchAllPosts = async () => {
  const fn = httpsCallable(functions, "fetchAllPosts");
  const result = await fn();
  return result.data; // [ { id, title, category, ... }, ... ]
};

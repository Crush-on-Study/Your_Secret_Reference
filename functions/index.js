const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * ✅ 게시글 추가
 */
exports.addPost = functions.https.onCall(async (data, context) => {
  const { category, title, content, author = "익명", thumbnail = "" } = data;
  if (!category || !title || !content) {
    throw new functions.https.HttpsError("invalid-argument", "카테고리, 제목, 내용은 필수입니다.");
  }

  const newPost = {
    title,
    content,
    author,
    thumbnail,
    createdAt: admin.firestore.Timestamp.now(),
  };

  const ref = await db.collection(category).add(newPost);
  return { success: true, id: ref.id };
});

/**
 * ✅ 게시글 수정
 */
exports.updatePost = functions.https.onCall(async (data, context) => {
  const { category, postId, updatedContent } = data;
  if (!category || !postId || !updatedContent) {
    throw new functions.https.HttpsError("invalid-argument", "입력값이 부족합니다.");
  }

  const postRef = db.collection(category).doc(postId);
  await postRef.update({
    content: updatedContent,
    updatedAt: admin.firestore.Timestamp.now(),
  });

  return { success: true };
});

/**
 * ✅ 게시글 삭제
 */
exports.deletePost = functions.https.onCall(async (data, context) => {
  const { category, postId } = data;
  if (!category || !postId) {
    throw new functions.https.HttpsError("invalid-argument", "입력값이 부족합니다.");
  }

  const postRef = db.collection(category).doc(postId);
  await postRef.delete();

  return { success: true };
});

/**
 * ✅ 게시글 단건 조회
 */
exports.getPostById = functions.https.onCall(async (data, context) => {
  const { category, postId } = data;
  if (!category || !postId) {
    throw new functions.https.HttpsError("invalid-argument", "입력값이 부족합니다.");
  }

  const postRef = db.collection(category).doc(postId);
  const docSnap = await postRef.get();

  if (!docSnap.exists) {
    throw new functions.https.HttpsError("not-found", "게시글을 찾을 수 없습니다.");
  }

  const doc = docSnap.data();
  return {
    id: docSnap.id,
    ...doc,
    createdAt: doc.createdAt?.toDate().toLocaleString("ko-KR") || "날짜 없음",
  };
});

/**
 * ✅ 모든 게시판 글 조회
 */
exports.fetchAllPosts = functions.https.onCall(async (data, context) => {
  const categories = [
    "NetworkPosts", "DatabasePosts", "OperatingSystemPosts", 
    "AlgorithmPosts", "FrontendPosts", "QAPosts", 
    "RealInterviewPosts", "DataStructurePosts"
  ];

  let allPosts = [];

  for (const category of categories) {
    const snapshot = await db.collection(category).get();
    snapshot.forEach(doc => {
      const data = doc.data();
      allPosts.push({
        id: doc.id,
        ...data,
        category,
        createdAt: data.createdAt?.toDate().toLocaleDateString("ko-KR") || "날짜 없음"
      });
    });
  }

  return allPosts;
});

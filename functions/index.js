const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * ✅ 카테고리별 게시글 조회
 */
exports.fetchPosts = functions.https.onCall(async (data, context) => {
  try {
    const { category } = data;
    if (!category) {
      throw new functions.https.HttpsError("invalid-argument", "카테고리가 지정되지 않았습니다.");
    }

    const postsRef = db.collection(category);
    const snapshot = await postsRef.get();

    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt
          ? data.createdAt.toDate().toLocaleString("ko-KR")
          : "날짜 없음",
      };
    });

    return posts;
  } catch (error) {
    console.error("fetchPosts 오류:", error);
    throw new functions.https.HttpsError("internal", error.message || "게시글 조회 실패");
  }
});

/**
 * ✅ 게시글 추가
 */
exports.addPost = functions.https.onCall(async (data, context) => {
  try {
    const { category, title, content, author = "익명", thumbnail = "" } = data;
    if (!category || !title || !content) {
      throw new functions.https.HttpsError("invalid-argument", "필수 필드가 누락되었습니다.");
    }

    const docRef = await db.collection(category).add({
      title,
      content,
      author,
      thumbnail,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("addPost 오류:", error);
    throw new functions.https.HttpsError("internal", error.message || "게시글 추가 실패");
  }
});

/**
 * ✅ 게시글 수정
 */
exports.updatePost = functions.https.onCall(async (data, context) => {
  try {
    const { category, postId, updatedContent } = data;
    if (!category || !postId || !updatedContent) {
      throw new functions.https.HttpsError("invalid-argument", "필수 필드가 누락되었습니다.");
    }

    const postRef = db.collection(category).doc(postId);
    await postRef.update({
      content: updatedContent,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("updatePost 오류:", error);
    throw new functions.https.HttpsError("internal", error.message || "게시글 수정 실패");
  }
});

/**
 * ✅ 게시글 삭제
 */
exports.deletePost = functions.https.onCall(async (data, context) => {
  try {
    const { category, postId } = data;
    if (!category || !postId) {
      throw new functions.https.HttpsError("invalid-argument", "필수 필드가 누락되었습니다.");
    }

    const postRef = db.collection(category).doc(postId);
    await postRef.delete();

    return { success: true };
  } catch (error) {
    console.error("deletePost 오류:", error);
    throw new functions.https.HttpsError("internal", error.message || "게시글 삭제 실패");
  }
});

/**
 * ✅ 게시글 단건 조회
 */
exports.getPostById = functions.https.onCall(async (data, context) => {
  try {
    const { category, postId } = data;
    if (!category || !postId) {
      throw new functions.https.HttpsError("invalid-argument", "필수 필드가 누락되었습니다.");
    }

    const postRef = db.collection(category).doc(postId);
    const doc = await postRef.get();

    if (!doc.exists) {
      throw new functions.https.HttpsError("not-found", "게시글을 찾을 수 없습니다.");
    }

    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt
        ? data.createdAt.toDate().toLocaleString("ko-KR")
        : "날짜 없음",
    };
  } catch (error) {
    console.error("getPostById 오류:", error);
    throw new functions.https.HttpsError("internal", error.message || "게시글 조회 실패");
  }
});

/**
 * ✅ 모든 게시판 글 통합 조회
 */
exports.fetchAllPosts = functions.https.onCall(async (data, context) => {
  try {
    const categories = [
      "NetworkPosts",
      "DatabasePosts",
      "OperatingSystemPosts",
      "AlgorithmPosts",
      "FrontEndPosts",
      "QAPosts",
      "RealInterviewPosts",
      "DataStructurePosts",
    ];

    let allPosts = [];

    for (const category of categories) {
      const postsRef = db.collection(category);
      const snapshot = await postsRef.get();

      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          category,
          createdAt: data.createdAt
            ? data.createdAt.toDate().toLocaleDateString("ko-KR")
            : "날짜 없음",
        };
      });

      allPosts = allPosts.concat(posts);
    }

    return allPosts;
  } catch (error) {
    console.error("fetchAllPosts 오류:", error);
    throw new functions.https.HttpsError("internal", error.message || "모든 게시글 조회 실패");
  }
});
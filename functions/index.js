const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage().bucket();

// CORS를 직접 처리하기 위해 onCall 옵션에 cors 설정 추가
const onCallWithCors = (options, handler) =>
  onCall({ ...options, cors: true }, handler);

/**
 * ✅ 게시글 추가 함수
 */
exports.addPost = onCallWithCors({ region: "asia-northeast3" }, async (request) => {
  try {
    const { category, title, content, author, thumbnail } = request.data;
    console.log("addPost 호출 데이터:", { category, title, content, author, thumbnail });

    // 데이터 유효성 검사
    if (!category || typeof category !== "string") {
      throw new Error("카테고리가 유효하지 않습니다.");
    }
    if (!title || typeof title !== "string") {
      throw new Error("제목이 유효하지 않습니다.");
    }
    if (!content || typeof content !== "string") {
      throw new Error("본문이 유효하지 않습니다.");
    }
    if (author && typeof author !== "string") {
      throw new Error("작성자가 유효하지 않습니다.");
    }
    if (thumbnail && typeof thumbnail !== "string") {
      throw new Error("썸네일 URL이 유효하지 않습니다.");
    }

    const postRef = await db.collection(category).add({
      title,
      content,
      author: author || "익명",
      thumbnail: thumbnail || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      views: 0,
    });

    return { success: true, id: postRef.id };
  } catch (error) {
    console.error("addPost 오류:", error.message, error.stack);
    throw new Error("게시글 추가 중 오류가 발생했습니다: " + error.message);
  }
});

/**
 * ✅ 게시글 수정 함수
 */
exports.updatePost = onCallWithCors({ region: "asia-northeast3" }, async (request) => {
  try {
    const { category, postId, updatedContent } = request.data;
    if (!category || !postId || !updatedContent) {
      throw new Error("필수 필드가 누락되었습니다.");
    }

    await db.collection(category).doc(postId).update({
      content: updatedContent,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("updatePost 오류:", error);
    throw new Error("게시글 수정 중 오류가 발생했습니다: " + error.message);
  }
});

/**
 * ✅ 게시글 삭제 함수
 */
exports.deletePost = onCallWithCors({ region: "asia-northeast3" }, async (request) => {
  try {
    const { category, postId } = request.data;
    if (!category || !postId) {
      throw new Error("필수 필드가 누락되었습니다.");
    }

    await db.collection(category).doc(postId).delete();

    return { success: true };
  } catch (error) {
    console.error("deletePost 오류:", error);
    throw new Error("게시글 삭제 중 오류가 발생했습니다: " + error.message);
  }
});

/**
 * ✅ 게시글 단건 조회 함수
 */
exports.getPostById = onCallWithCors({ region: "asia-northeast3" }, async (request) => {
  try {
    const { category, postId } = request.data;
    if (!category || !postId) {
      throw new Error("필수 필드가 누락되었습니다.");
    }

    const doc = await db.collection(category).doc(postId).get();
    if (!doc.exists) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }

    const postData = doc.data();
    return {
      id: doc.id,
      ...postData,
      createdAt: postData.createdAt ? postData.createdAt.toDate().toISOString() : null,
    };
  } catch (error) {
    console.error("getPostById 오류:", error);
    throw new Error("게시글 조회 중 오류가 발생했습니다: " + error.message);
  }
});

/**
 * ✅ 모든 게시판 글 통합 조회
 */
exports.fetchAllPosts = onCallWithCors({ region: "asia-northeast3" }, async (request) => {
  try {
    const categories = [
      "NetworkPosts",
      "DataStructurePosts",
      "DatabasePosts",
      "OperatingSystemPosts",
      "QAPosts",
      "FrontEndPosts",
      "AlgorithmPosts",
      "RealInterviewPosts",
    ];

    let allPosts = [];
    for (const category of categories) {
      const snapshot = await db.collection(category).get();
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        category,
        ...doc.data(),
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null,
      }));
      allPosts = allPosts.concat(posts);
    }

    return allPosts;
  } catch (error) {
    console.error("fetchAllPosts 오류:", error);
    throw new Error("게시글 조회 중 오류가 발생했습니다: " + error.message);
  }
});

/**
 * ✅ 카테고리별 게시글 조회
 */
exports.fetchPosts = onCallWithCors({ region: "asia-northeast3" }, async (request) => {
  try {
    const { category } = request.data;
    if (!category) {
      throw new Error("카테고리가 누락되었습니다.");
    }

    const snapshot = await db.collection(category).get();
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null,
    }));

    return posts;
  } catch (error) {
    console.error("fetchPosts 오류:", error);
    throw new Error("게시글 조회 중 오류가 발생했습니다: " + error.message);
  }
});

/**
 * ✅ 이미지 업로드 함수
 */
exports.uploadImage = onCallWithCors({ region: "asia-northeast3" }, async (request) => {
  try {
    const { fileData, fileName } = request.data;
    if (!fileData || !fileName) {
      throw new Error("파일 데이터 또는 파일 이름이 누락되었습니다.");
    }

    const file = storage.file(`thumbnails/${fileName}`);
    const buffer = Buffer.from(fileData, "base64");

    await file.save(buffer, {
      metadata: { contentType: "image/jpeg" },
    });

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });

    return { success: true, url };
  } catch (error) {
    console.error("uploadImage 오류:", error);
    throw new Error("이미지 업로드 중 오류가 발생했습니다: " + error.message);
  }
});
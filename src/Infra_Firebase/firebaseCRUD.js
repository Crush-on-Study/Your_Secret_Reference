import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, getDocs } from "firebase/firestore";

const db = getFirestore();

/**
 * ✅ Firestore에서 특정 카테고리의 게시글 목록 가져오기 (실시간 업데이트)
 * @param {string} category - 게시판 카테고리 (예: "NetworkPosts", "DatabasePosts")
 * @param {function} callback - 데이터를 업데이트할 함수
 */
export const fetchPosts = (category, callback) => {
  if (!category || typeof category !== "string") {
    console.error("❌ fetchPosts: 유효하지 않은 카테고리 값입니다!");
    return;
  }

  const postsRef = collection(db, category);
  console.log(`📌 Firestore에서 ${category} 게시글 불러오기 시작`);

  const unsubscribe = onSnapshot(postsRef, (snapshot) => {
    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000).toLocaleString("ko-KR")
          : "날짜 없음",
      };
    });

    console.log("✅ Firestore에서 불러온 게시글:", posts);
    callback(posts);
  });

  return unsubscribe;
};

/**
 * ✅ Firestore에 새 게시글 추가 (카테고리별 컬렉션 적용)
 * @param {string} category - 게시판 카테고리 (예: "NetworkPosts", "DatabasePosts")
 * @param {string} title - 게시글 제목
 * @param {string} content - 게시글 내용
 * @param {string} author - 작성자
 */
export const addPost = async (category, title, content, author = "익명") => {
  if (!category || typeof category !== "string") {
    console.error("❌ addPost: 유효하지 않은 카테고리 값입니다!");
    return;
  }

  try {
    console.log(`🔥 Firestore(${category})에 게시글 추가 중...`);

    const docRef = await addDoc(collection(db, category), {
      title,
      content,
      author,
      createdAt: serverTimestamp(),
    });

    console.log(`✅ Firestore(${category})에 저장 완료! 문서 ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("❌ Firestore 저장 오류:", error);
  }
};

// ✅ Firestore에서 모든 게시판의 게시글 가져오기
export const fetchAllPosts = async () => {
  const categories = [
    "NetworkPosts",
    "DatabasePosts",
    "OperatingSystemPosts",
    "AlgorithmPosts",
    "FrontendPosts",
    "QAPosts",
    "RealInterviewPosts",
    "DataStructurePosts",
  ];

  let allPosts = [];

  for (const category of categories) {
    const postsRef = collection(db, category);
    const querySnapshot = await getDocs(postsRef);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      allPosts.push({
        id: doc.id,
        ...data,
        category,
        createdAt: data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000).toLocaleDateString("ko-KR")
          : "날짜 없음",
      });
    });
  }

  return allPosts;
};
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

/**
 * ✅ Firestore에서 GNB별 게시글 목록 가져오기 (실시간 반영)
 * @param {string} category - 게시판 카테고리 (예: "network", "database", "algorithm")
 * @param {function} callback - 데이터를 업데이트할 함수
 */
export const fetchPosts = (category, callback) => {
  if (!category || typeof category !== "string") {
    console.error("❌ fetchPosts: 유효하지 않은 카테고리 값입니다! 기본값 'posts'로 설정");
    category = "posts"; // 기본값 설정
  }

  const collectionName = `${category}Posts`.replace("//", "/"); // ✅ 슬래시 두 개 방지
  console.log(`📌 Firestore에서 불러올 컬렉션: ${collectionName}`);

  const postsRef = collection(db, collectionName);

  const unsubscribe = onSnapshot(postsRef, (snapshot) => {
    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();

      // ✅ Firestore Timestamp → JS 날짜 변환
      let formattedDate = "날짜 없음";
      if (data.createdAt && data.createdAt.seconds) {
        formattedDate = new Date(data.createdAt.seconds * 1000).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      return {
        id: doc.id,
        ...data,
        createdAt: formattedDate, // ✅ 변환된 날짜 저장
      };
    });

    console.log("✅ Firestore에서 변환된 게시글 데이터:", posts);
    callback(posts);
  });

  return unsubscribe;
};

/**
 * ✅ Firestore에 새 게시글 추가 (카테고리별 컬렉션 적용)
 * @param {string} category - 게시판 카테고리 (예: "network", "database", "algorithm")
 * @param {string} title - 게시글 제목
 * @param {string} content - 게시글 내용
 * @param {string} [author="Crush on Study"] - 작성자 (기본값: "Crush on Study")
 */
export const addPost = async (category, title, content, author = "Crush on Study") => {
  if (!category || typeof category !== "string") {
    console.error("❌ addPost: 유효하지 않은 카테고리 값입니다! 기본값 'posts'로 설정");
    category = "posts"; // 기본값 설정
  }

  const collectionName = `${category}Posts`.replace("//", "/"); // ✅ 슬래시 두 개 방지
  console.log(`🔥 addPost 실행됨! 카테고리: ${collectionName}`);

  try {
    console.log("📌 저장할 데이터:", { title, content, author });

    const docRef = await addDoc(collection(db, collectionName), {
      title,
      content,
      author,
      createdAt: serverTimestamp(),
    });

    console.log(`✅ Firestore(${collectionName})에 저장 완료! ID:`, docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Firestore 저장 오류:", error);
  }
};

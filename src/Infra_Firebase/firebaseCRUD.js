import { 
  getFirestore, collection, addDoc, onSnapshot, serverTimestamp, getDocs, 
  updateDoc, deleteDoc, doc, getDoc 
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore();
const storage = getStorage();

/**
 * ✅ Firestore에서 특정 카테고리의 게시글 목록 가져오기 (실시간 업데이트)
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
 * ✅ Firestore에 새 게시글 추가 (썸네일 지원 추가)
 */
export const addPost = async (category, title, content, author = "익명", thumbnail = "") => {
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
      thumbnail, // ✅ 썸네일 저장 추가
      createdAt: serverTimestamp(),
    });

    console.log(`✅ Firestore(${category})에 저장 완료! 문서 ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("❌ Firestore 저장 오류:", error);
  }
};

/**
 * ✅ Firestore에서 게시글 수정
 */
export const updatePost = async (category, postId, updatedContent) => {
  const postRef = doc(db, category, postId);
  await updateDoc(postRef, { content: updatedContent, updatedAt: serverTimestamp() });
};

/**
 * ✅ Firestore에서 게시글 삭제
 */
export const deletePost = async (category, postId) => {
  const postRef = doc(db, category, postId);
  await deleteDoc(postRef);
};

/**
 * ✅ Firestore에서 모든 게시판의 게시글 가져오기
 */
export const fetchAllPosts = async () => {
  const categories = [
    "NetworkPosts", "DatabasePosts", "OperatingSystemPosts", 
    "AlgorithmPosts", "FrontendPosts", "QAPosts", 
    "RealInterviewPosts", "DataStructurePosts"
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

/**
 * ✅ Firestore에서 특정 게시글 가져오기 (카테고리 동적 처리)
 */
export const getPostById = async (category, postId) => {
  if (!category || !postId) {
    console.error("❌ getPostById: 유효하지 않은 카테고리 또는 postId 값입니다!");
    return null;
  }

  const postRef = doc(db, category, postId);
  const docSnap = await getDoc(postRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.seconds
        ? new Date(data.createdAt.seconds * 1000).toLocaleString("ko-KR")
        : "날짜 없음",
    };
  } else {
    console.error("게시글을 찾을 수 없습니다.");
    return null;
  }
};

/**
 * ✅ Firebase Storage에 이미지 업로드 (썸네일 지원 추가)
 */
export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `thumbnails/${file.name}`);
  
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("✅ 이미지 업로드 완료:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("❌ 이미지 업로드 실패:", error);
    return null;
  }
};

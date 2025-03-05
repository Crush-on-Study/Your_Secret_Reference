import { useState, useEffect } from "react";
import { fetchPosts, addPost } from "./firebaseCRUD"; // ✅ 기존 Firestore CRUD

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  const addNewPost = async (title, content) => {
    const newPostId = await addPost(title, content, "익명", "/assets/default-thumbnail.jpg");
    if (newPostId) {
      setPosts([{ id: newPostId, title, content, author: "익명", date: new Date().toISOString().split("T")[0], likes: 0, comments: 0, thumbnail: "/assets/default-thumbnail.jpg" }, ...posts]);
    }
  };

  return { posts, addNewPost };
};

export default usePosts;

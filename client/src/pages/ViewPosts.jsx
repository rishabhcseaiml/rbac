import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function ViewPosts({ user, onLogout }) {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await axios.get("/posts", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    setPosts(res.data);
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`/posts/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });

    alert("✅ Post deleted");
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Layout user={user} onLogout={onLogout}>
      <h1 className="text-3xl font-bold mb-4">Posts</h1>

      {posts.map((p) => (
        <div key={p._id} className="bg-white p-4 shadow rounded mb-4 border">
          <h2 className="text-xl font-semibold">{p.title}</h2>
          <p>{p.content}</p>

          {(user.role === "Admin" || user.role === "Editor") && (
            <button
              onClick={() => deletePost(p._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </Layout>
  );
}

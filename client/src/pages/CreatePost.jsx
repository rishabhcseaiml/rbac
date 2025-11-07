import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function CreatePost({ user, onLogout }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/posts",
        { title, content },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("✅ Post Created Successfully");

      // ✅ Redirect to Dashboard
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("❌ Error creating post");
    }
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <h1 className="text-3xl font-bold mb-4">Create Post</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          rows={5}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </Layout>
  );
}

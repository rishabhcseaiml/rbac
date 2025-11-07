import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ user }) {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-100 h-screen p-6 shadow-lg fixed select-none">
      <h2 className="text-xl font-semibold mb-6">Menu</h2>

      <ul className="space-y-4 text-[17px]">

        <li
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/dashboard")}
        >
          📊Dashboard
        </li>

        {user.role === "Admin" && (
        <li
  className="cursor-pointer hover:text-blue-600"
  onClick={() => navigate("/manage-users")}
>
  👥Manage Users
</li>

        )}

        {(user.role === "Admin" || user.role === "Editor") && (
          <li
            className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/create-post")}
          >
            📝Create Post
          </li>
        )}

        <li
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/view-posts")}
        >
         📄 View Posts
        </li>
      </ul>
    </div>
  );
}

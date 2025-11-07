import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import ViewPosts from "./pages/ViewPosts";
import ManageUsers from "./pages/ManageUsers";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ✅ If user not logged in → show only login page
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard user={user} onLogout={handleLogout} />}
      />

      <Route
        path="/manage-users"
        element={<ManageUsers user={user} onLogout={handleLogout} />}
      />

      <Route
        path="/create-post"
        element={<CreatePost user={user} onLogout={handleLogout} />}
      />

      <Route
        path="/view-posts"
        element={<ViewPosts user={user} onLogout={handleLogout} />}
      />

      {/* ✅ default fallback — open dashboard */}
      <Route
        path="*"
        element={<Dashboard user={user} onLogout={handleLogout} />}
      />
    </Routes>
  );
}

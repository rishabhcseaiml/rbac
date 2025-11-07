import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ user, onLogout }) {
  const [roleCounts, setRoleCounts] = useState({
    Admin: 0,
    Editor: 0,
    Viewer: 0,
  });

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);
  const [canShowRoleChart, setCanShowRoleChart] = useState(true);

  // Convert ISO date to "time ago" format
  const timeAgo = (iso) => {
    const d = new Date(iso);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);

    const units = [
      ["y", 365 * 24 * 3600],
      ["mo", 30 * 24 * 3600],
      ["d", 24 * 3600],
      ["h", 3600],
      ["m", 60],
      ["s", 1],
    ];

    for (const [label, secs] of units) {
      const val = Math.floor(diff / secs);
      if (val > 0) return `${val}${label} ago`;
    }

    return "just now";
  };

  const loadData = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    try {
      const postsRes = await axios.get("/posts", { headers });
      const posts = postsRes.data || [];

      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setTotalPosts(posts.length);
      setRecentPosts(posts.slice(0, 5));

      try {
        const usersRes = await axios.get("/users", { headers });
        const users = usersRes.data || [];

        setTotalUsers(users.length);
        setRoleCounts({
          Admin: users.filter((u) => u.role === "Admin").length,
          Editor: users.filter((u) => u.role === "Editor").length,
          Viewer: users.filter((u) => u.role === "Viewer").length,
        });

        setCanShowRoleChart(true);
      } catch {
        setCanShowRoleChart(false);
      }
    } catch (err) {
      console.log("Dashboard load error", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const roleChartData = useMemo(
    () => ({
      labels: ["Admins", "Editors", "Viewers"],
      datasets: [
        {
          data: [roleCounts.Admin, roleCounts.Editor, roleCounts.Viewer],
          backgroundColor: ["#ef4444", "#3b82f6", "#22c55e"],
          borderWidth: 0,
        },
      ],
    }),
    [roleCounts]
  );

  return (
    <Layout user={user} onLogout={onLogout}>
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome, {user.name} 👋
      </h1>
      <p className="text-gray-600 mb-6">Role: {user.role}</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded shadow">
          <h2 className="text-sm text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-blue-700">
            {canShowRoleChart ? totalUsers : "—"}
          </p>
        </div>

        <div className="p-6 bg-green-50 border-l-4 border-green-600 rounded shadow">
          <h2 className="text-sm text-gray-600">Total Posts</h2>
          <p className="text-3xl font-bold text-green-700">{totalPosts}</p>
        </div>

        <div className="p-6 bg-purple-50 border-l-4 border-purple-600 rounded shadow">
          <h2 className="text-sm text-gray-600">Your Role</h2>
          <p className="text-3xl font-bold text-purple-700">{user.role}</p>
        </div>
      </div>

      {/* Charts + Recent Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* User Role Chart */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">User Role Distribution</h2>
          {canShowRoleChart ? (
            <Pie data={roleChartData} />
          ) : (
            <p className="text-gray-500">Admin only section</p>
          )}
        </div>

        {/* Latest 5 Posts */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Latest 5 Posts</h2>
          {recentPosts.map((p) => (
            <div
              key={p._id}
              className="border rounded p-4 mb-3 hover:shadow duration-200"
            >
              <p className="text-xs text-gray-500">{timeAgo(p.createdAt)}</p>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {p.content.length > 120
                  ? p.content.substring(0, 120) + "..."
                  : p.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

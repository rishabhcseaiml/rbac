import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function ManageUsers({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("Viewer");

  const loadUsers = async () => {
    try {
      const res = await axios.get("/users", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setUsers(res.data);
    } catch (err) {
      alert("❌ Error loading users");
    }
  };

  const createUser = async () => {
    try {
      await axios.post(
        "/users",
        {
          name: newName,
          email: newEmail,
          password: newPassword,
          role: newRole,
        },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );

      alert("✅ User created");

      setShowForm(false);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setNewRole("Viewer");

      loadUsers();
    } catch (err) {
      console.log(err);
      alert("❌ Failed to create user");
    }
  };

  const updateRole = async (id, role) => {
    try {
      await axios.patch(
        `/users/${id}/role`,
        { role },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );

      alert("✅ Role updated");
      loadUsers();
    } catch (err) {
      alert("❌ Failed to update role (Backend route OK?)");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`/users/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      alert("✅ User deleted");
      loadUsers();
    } catch (err) {
      alert("❌ Failed to delete user");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700"
        >
          ➕ Add User
        </button>
      </div>

      {/* ✅ Add User Form */}
      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6 border">
          <h2 className="text-xl font-semibold mb-4">Create New User</h2>

          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Full Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Email Address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Set Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <select
            className="border p-2 w-full mb-4 rounded"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>

          <button
            className="w-full bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            onClick={createUser}
          >
            ✅ Create User
          </button>
        </div>
      )}

      {/* ✅ Users List */}
      {users.map((u) => (
        <div
          key={u._id}
          className="bg-white p-4 rounded shadow mb-4 border flex justify-between items-center"
        >
          <div>
            <p>
              <strong>Name:</strong> {u.name}
            </p>
            <p>
              <strong>Email:</strong> {u.email}
            </p>
            <p>
              <strong>Role:</strong> {u.role}
            </p>
          </div>

          {/* ✅ Role Dropdown + Delete Button */}
          <div className="flex gap-3 items-center">

            <select
              className="border p-2 rounded"
              value={u.role}
              onChange={(e) => updateRole(u._id, e.target.value)}
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>

            <button
              onClick={() => deleteUser(u._id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </Layout>
  );
}

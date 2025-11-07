import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <div className="bg-white shadow-md h-16 flex justify-between items-center px-6">
      <h1 className="text-xl font-semibold text-blue-700">RBAC Dashboard <br/></h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">{user.name}</span>
        <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
          {user.role}
        </span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          🚪Logout
        </button>
      </div>
    </div>
  );
}

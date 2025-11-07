import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ user, onLogout, children }) {
  return (
    <div className="flex">
      <Sidebar user={user} />

      <div className="flex-1 ml-64">
        <Navbar user={user} onLogout={onLogout} />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

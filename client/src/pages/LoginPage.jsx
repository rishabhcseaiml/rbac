import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", { email, password });

      // ✅ SUCCESS → App.jsx ko correct data send
      onLogin(res.data);

    } catch (err) {
      console.log(err);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      alert("❌ Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] 
      relative overflow-hidden animate-bgmove"
    >
      {/* Floating Icons */}
      <div className="absolute top-10 left-10 text-white opacity-40 animate-floating">
        <Mail size={55} />
      </div>

      <div className="absolute bottom-20 right-16 text-white opacity-40 animate-floating-delayed">
        <Lock size={60} />
      </div>

      {/* Login Card */}
      <div
        className={`w-full max-w-md p-10 bg-white/10 backdrop-blur-lg rounded-2xl 
        shadow-2xl border border-white/20 animate-fade-in ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-4xl font-extrabold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-blue-400" size={20} />
            <input
              type="email"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 text-white 
              border border-white/30 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-purple-400" size={20} />
            <input
              type="password"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 text-white
              border border-white/30 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 
            hover:bg-blue-700 transition py-3 rounded-xl text-white font-medium shadow-xl"
          >
            <LogIn size={18} /> Login
          </button>
        </form>
      </div>
    </div>
  );
}

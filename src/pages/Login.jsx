import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ⬅️ error message ke liye
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Real API call to backend
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Token save karo browser mein
        localStorage.setItem("adminToken", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials!");
      }

    } catch (err) {
      setError("Server se connect nahi ho pa raha!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark">
      <div className="bg-steel/30 p-8 rounded-xl shadow-lg w-96 border border-silver/40">
        <h2 className="text-2xl font-bold text-center text-cream mb-6 font-heading">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-dark text-cream border border-silver/30 focus:outline-none focus:ring-2 focus:ring-steel"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-dark text-cream border border-silver/30 focus:outline-none focus:ring-2 focus:ring-steel"
          />

          {/* ✅ Error message dikhao */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-steel hover:bg-steel/80 text-cream py-2 rounded-md font-semibold transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginPage() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      // console.log(res.data);
      const { token, role } = res.data;
      console.log(role);
      localStorage.setItem("token", token);
      if (role == "admin") navigate("/admin");
      else if (role == "user") navigate("/user");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-600 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

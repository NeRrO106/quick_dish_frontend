import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.password) {
      alert("Name and password needs to be filled");
      return;
    }
    axios
      .post(`${apiUrl}/api/auth/login`, form, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          You forgot you password?{" "}
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Reset Password
          </a>
        </p>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
export default Login;

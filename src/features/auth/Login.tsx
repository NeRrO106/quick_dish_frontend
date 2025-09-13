import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/ShowToast";
import postEntity from "../../utils/PostEntity";
import { useQueryClient } from "@tanstack/react-query";

function Login() {
  const queryClient = useQueryClient();
  const endpointUrl = import.meta.env.VITE_AUTH_ENDPOINT;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.password) {
      showToast("Name and password need to be filled", "error");
      return;
    }
    await postEntity(`${endpointUrl}login`, form)
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        showToast("Login successful!", "success");

        queryClient.setQueryData(["currentUser"], data);

        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      })

      .catch((error) => {
        console.log(error);
        showToast(error.response?.data || "❌ Something went wrong!", "error");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-secondary)]">
      <div className="w-full max-w-md p-8 bg-[var(--color-secondary)]/20 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[var(--text-dark)] mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="username"
            >
              Username
              <input
                type="text"
                id="username"
                autoComplete="username"
                name="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent2)]"
                placeholder="Enter your username"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="password"
            >
              Password
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent2)]"
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[var(--color-accent3)] rounded hover:bg-[var(--color-darker-accent3)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Forgot your password?{" "}
          <a href="/forgotpassword" className="text-blue-600 hover:underline">
            Reset password
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

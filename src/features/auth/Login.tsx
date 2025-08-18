import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postEntity from "../../utils/PostEntity";

function Login() {
  const endpoitUrl = import.meta.env.VITE_AUTH_ENDPOINT;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.password) {
      setError("Name and password needs to be filled");
      return;
    }
    await postEntity(`${endpoitUrl}login`, form)
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-secondary)]">
      <div className="w-full max-w-md p-8 bg-[var(--color-secondary)]/20 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[var(--text-dark)] mb-6">
          Login
        </h2>
        <form>
          {error && <p className="text-[var(--color-accent2)]">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="username"
            >
              Username
              <input
                type="username"
                id="username"
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
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Forgot your password?{" "}
          <a href="/forgotpassword" className="text-blue-600 hover:underline">
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

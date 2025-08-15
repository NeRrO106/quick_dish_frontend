import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postEntity from "../../utils/PostEntity";

function Register() {
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all the fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Password doesnt match");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Invalide email");
      return;
    }

    await postEntity(`${endpointUrl}`, form)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-secondary)]">
      <div className="w-full max-w-md p-8 bg-[var(--color-secondary)]/20 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[var(--text-dark)] mb-6">
          Register
        </h2>
        {error && <p className="text-[var(--color-accent2)]">{error}</p>}
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="username"
            >
              Username
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent2)]"
                placeholder="Enter your username"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="email"
            >
              Email
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent2)]"
                placeholder="Enter your email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email}
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
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="password"
            >
              Confirm Password
              <input
                type="password"
                id="cpassword"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent2)]"
                placeholder="Confirm your password"
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                value={form.confirmPassword}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-[var(--text-light)] bg-[var(--color-accent3)] rounded hover:bg-[var(--color-darker-accent3)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent3)]"
            onClick={(e) => handleRegister(e)}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postEntity from "../../utils/PostEntity";
import validator from "validator";
import { showToast } from "../../utils/ShowToast";

function ForgotPassword() {
  const endpointUrl = import.meta.env.VITE_AUTH_ENDPOINT;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!form.email || !form.newPassword || !form.confirmNewPassword) {
      setError("Please fill in all the fields");
      showToast("Please fill in all the fields", "error");
      return;
    }

    if (
      passwordPattern.test(form.newPassword) ||
      passwordPattern.test(form.confirmNewPassword)
    ) {
      setError(
        "Parola trebuie sa aiba minim 8 caractere(litere mari, litere mici, caractere speciale etc.)"
      );
      showToast(
        "Parola trebuie sa aiba minim 8 caractere(litere mari, litere mici, caractere speciale etc.)",
        "error"
      );
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      setError("Password doesnt match");
      showToast("Password doesnt match", "error");
      return;
    }

    if (!validator.isEmail(form.email)) {
      setError("Invalide email");
      showToast("Invalid email", "error");
      return;
    }

    await postEntity(`${endpointUrl}resetpassword`, form)
      .then((response) => {
        console.log(response);
        showToast("Password reset", "success");
        setTimeout(() => {
          navigate("/login");
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
          Reset Password
        </h2>
        {error && <p className="text-[var(--color-accent2)]">{error}</p>}
        <form>
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

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="code"
            >
              Code
              <input
                type="code"
                id="code"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent2)]"
                placeholder="Enter your code"
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                value={form.code}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="code"
            >
              New Password
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent2)]"
                placeholder="Enter your password"
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                value={form.newPassword}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--text-dark)] mb-2"
              htmlFor="code"
            >
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent2)]"
                placeholder="Confirm your password"
                onChange={(e) =>
                  setForm({ ...form, confirmNewPassword: e.target.value })
                }
                value={form.confirmNewPassword}
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-[var(--text-light)] bg-[var(--color-accent3)] rounded hover:bg-[var(--color-darker-accent3)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent3)]"
            onClick={(e) => handleResetPassword(e)}
          >
            Reset your Password
          </button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;

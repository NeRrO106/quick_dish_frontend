import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postEntity from "../../utils/PostEntity";
import validator from "validator";
import { showToast } from "../../utils/ShowToast";

function ForgotPassword() {
  const endpointUrl = import.meta.env.VITE_AUTH_ENDPOINT;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setError("Please fill in your email");
      showToast("Please fill in your email", "error");
      return;
    }
    await postEntity(`${endpointUrl}forgotpassword`, email)
      .then((response) => {
        console.log(response);
        showToast("Email send successful!", "success");
        setTimeout(() => {
          navigate("/resetpassword");
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
          Forgot Password
        </h2>
        <form>
          {error && <p className="text-[var(--color-accent2)] mb-4">{error}</p>}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-[var(--text-light)] bg-[var(--color-accent3)] rounded hover:bg-[var(--color-darker-accent3)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent3)]"
            onClick={(e) => handleForgotPassword(e)}
          >
            Send Email Code
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          You rememberd you password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
export default ForgotPassword;

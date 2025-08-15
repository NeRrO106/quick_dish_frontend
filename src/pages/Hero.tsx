import axios from "axios";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleGhost = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/api/auth/login-ghost`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error on loggin: ", error);
      });
  };

  return (
    <div className=" min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4">
      <div className="text-center max-w-xl text-[var(--text-dark)] space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Quick Dish
        </h1>
        <p className="text-lg md:text-xl font-light">
          For the best experice you need to loggin
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/login")}
            className="transition-all duration-300 focus:outline-none text-[var(--text-light)] bg-[var(--color-primary)] hover:bg-[var(--color-accent3)] focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-md px-6 py-2 shadow-lg dark:focus:ring-green-800"
          >
            Log In
          </button>
          <button
            className="transition-all duration-300 focus:outline-none text-[var(--text-dark)] bg-[var(--color-accent2)] hover:bg-[var(--color-accent3)] focus:ring-4 focus:ring-yellow-300 font-semibold rounded-lg text-md px-6 py-2 shadow-lg dark:focus:ring-yellow-900"
            onClick={(e) => handleGhost(e)}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
export default Hero;

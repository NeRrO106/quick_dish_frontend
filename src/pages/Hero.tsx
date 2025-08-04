import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleGhost = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${apiUrl}/auth/login-ghost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to login");
        }
      })
      .catch((error) => {
        console.error("Error on loggin: ", error);
      });
    navigate("/");
  };

  return (
    <div className=" min-h-screen bg-emerald-500 flex items-center justify-center px-4">
      <div className="text-center max-w-xl text-white space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Quick Dish
        </h1>
        <p className="text-lg md:text-xl font-light">
          For the best experice you need to loggin
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/login")}
            className="transition-all duration-300 focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-md px-6 py-2 shadow-lg dark:focus:ring-green-800"
          >
            Log In
          </button>
          <button
            className="transition-all duration-300 focus:outline-none text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-lg text-md px-6 py-2 shadow-lg dark:focus:ring-yellow-900"
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

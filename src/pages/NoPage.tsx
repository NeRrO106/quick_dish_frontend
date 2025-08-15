import { useNavigate } from "react-router-dom";

function NoPage() {
  const navigate = useNavigate();
  return (
    <div className=" min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          404 - Page Not Found
        </h1>
        <p className="text-lg md:text-xl font-light">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="text-lg md:text-xl font-light">
          Please check the URL or return to the homepage.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="transition-all duration-300 focus:outline-none text-[var(--text-light)] bg-[var(--color-accent3)] hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-md px-6 py-2 shadow-lg dark:focus:ring-green-800"
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}
export default NoPage;

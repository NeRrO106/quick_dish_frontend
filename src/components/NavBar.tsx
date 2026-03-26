import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../hooks/useCurrentUser";
import postEntity from "../utils/PostEntity";

type Role = "Client" | "Guest" | "Admin" | "Manager" | "Courier" | "None";

const navLinks: Record<Role, { name: string; path: string }[]> = {
  None: [],
  Client: [],
  Guest: [],
  Admin: [
    { name: "Users", path: "/users" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Menu", path: "/menu" },
  ],
  Manager: [
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Menu", path: "/menu" },
  ],
  Courier: [
    { name: "Orders", path: "/orders" },
    { name: "Menu", path: "/menu" },
  ],
};

function NavBar() {
  const { data } = useCurrentUser();
  const queryClient = useQueryClient();
  const endpointUrl = import.meta.env.VITE_AUTH_ENDPOINT;
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = data?.Role && data.Role !== "None";
  const isGuest = data?.Role === "Guest";

  const handleSignOut = async () => {
    try {
      await postEntity(`${endpointUrl}logout`, {});
      localStorage.removeItem("user");
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      setIsDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const role = (data?.Role ?? "None") as Role;

  return (
    <nav className="bg-[var(--color-primary)] border-b border-[var(--color-secondary)]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            className="h-8"
            alt="Logo"
          />
          <Link
            to="/menu"
            className="self-center text-2xl font-semibold whitespace-nowrap text-[var(--text-light)]"
          >
            Quick Dish
          </Link>
        </div>

        <div className="flex items-center gap-3 md:order-2 relative">
          {isLoggedIn && !isGuest && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-[var(--color-primary)] rounded-full px-3 py-1 shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
              >
                <img
                  className="w-8 h-8 rounded-full border-2 border-[var(--color-accent1)]"
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="user"
                />
                <svg
                  className={`w-4 h-4 text-[var(--text-light)] transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-primary)] rounded-lg shadow-xl divide-y divide-gray-100 z-50">
                  <div className="px-4 py-3">
                    <span className="block text-md text-[var(--text-light)]">
                      {data?.Name}
                    </span>
                    <span className="block text-sm text-[var(--text-light)] truncate">
                      {data?.Email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to={`/myorders/${data?.Id}`}
                        className="block px-4 py-2 text-md text-[var(--text-light)] hover:bg-[var(--color-accent1)]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-md text-[var(--text-light)] hover:bg-[var(--color-accent1)]"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {isLoggedIn && (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--text-light)] font-semibold rounded-full shadow hover:bg-[var(--color-accent3)] focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
              onClick={() => navigate("/cart")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              Cart
            </button>
          )}
          {isGuest && (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent2)] text-[var(--text-dark)] font-semibold rounded-full shadow hover:bg-[var(--color-accent3)] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H3m0 0l4-4m-4 4l4 4m12 0v-6a2 2 0 00-2-2H9m6 8l3 3m0 0l3-3m-3 3V9"
                />
              </svg>
              Login
            </button>
          )}
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-[var(--color-primary)] rounded-lg bg-[var(--color-primary)] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {navLinks[role].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="block py-2 px-3 text-[var(--text-light)] rounded-sm hover:bg-[var(--color-accent1)] md:p-0"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

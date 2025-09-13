import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../hooks/useCurrentUser";
import postEntity from "../utils/PostEntity";

type Role = "Client" | "Guest" | "Admin" | "Manager" | "Courier" | "None";

const navLinks: Record<Role, { name: string; path: string }[]> = {
  None: [],
  Client: [{ name: "Cart", path: "/cart" }],
  Guest: [
    { name: "Cart", path: "/cart" },
    { name: "Login", path: "/login" },
  ],
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

  const handleSignOut = async () => {
    try {
      await postEntity(`${endpointUrl}/logout`, {});
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

        {isLoggedIn && (
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex text-sm bg-[var(--color-primary)] rounded-full focus:ring-2 focus:ring-gray-300"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="user"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 right-0 z-50 w-48 bg-[var(--color-primary)] rounded-lg shadow divide-y divide-gray-100">
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
                      to="/cart"
                      className="block px-4 py-2 text-md text-[var(--text-light)] hover:bg-[var(--color-accent1)]"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/myorders/${data?.Id}`}
                      className="block px-4 py-2 text-md text-[var(--text-light)] hover:bg-[var(--color-accent1)]"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
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

import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import postEntity from "../utils/PostEntity";

type Role = "Client" | "Ghost" | "Admin" | "Manager" | "Courier";

const navLinks: Record<Role, { name: string; path: string }[]> = {
  Client: [
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
  ],
  Ghost: [
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
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
  const endpointUrl = import.meta.env.VITE_AUTH_ENDPOINT;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await postEntity(`${endpointUrl}/logout`, {});
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const role = (data?.Role ?? "Client") as Role;

  return (
    <nav className="bg-[var(--color-primary)] border-b border-[var(--color-secondary)]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[var(--text-light)]">
            Quick Dish
          </span>
        </div>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-[var(--color-primary)] rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user photo"
            />
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none bg-[var(--color-primary)] divide-y divide-gray-100 rounded-lg shadow-sm"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-md text-[var(--text-light)]">
                {data?.Name}
              </span>
              <span className="block text-sm text-[var(--text-light)] truncate">
                {data?.Email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="/cart"
                  className="block px-4 py-2 text-md text-[var(--text-light)] hover:bg-[var(--color-accent1)] hover:scale-85"
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href={`myorders/${data?.Id}`}
                  className="block px-4 py-2 text-md text-[var(--text-light)] hover:bg-[var(--color-accent1)] hover:scale-85"
                >
                  My Orders
                </a>
              </li>
              <li>
                <button className="block px-4 py-2 text-md text-[var(--text-light)] hover:bg-[var(--color-accent1)] hover:scale-85">
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-md text-[var(--text-light)] hover:bg-[var(--color-accent1)] hover:scale-85"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[var(--text-light)] rounded-lg md:hidden focus:outline-none focus:ring-2"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-[var(--color-primary)] rounded-lg bg-[var(--color-primary)] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {navLinks[role].map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className="block py-2 px-3 text-[var(--text-light)] rounded-sm hover:bg-[var(--color-accent1)] md:p-0 hover:scale-85"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

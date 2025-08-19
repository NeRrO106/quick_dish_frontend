import { useState } from "react";
import type { User } from "./User";
import postEntity from "../../utils/PostEntity";
import validator from "validator";
import { showToast } from "../../utils/ShowToast";

function AddUser() {
  const [form, setForm] = useState({
    Id: 0,
    Name: "",
    Email: "",
    Password: "",
    Role: "",
    CreatedAt: "",
  });
  const roles = ["Client", "Admin", "Manager", "Courier"];
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (role: string) => {
    console.log("Selected role:", role);
    setForm({ ...form, Role: role });
    setDropdownOpen(!dropdownOpen);
  };

  const handleSave = async () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!form.Name || !form.Email || !form.Password) {
      showToast("Please fill in all the fields", "error");
      return;
    }

    if (!passwordPattern.test(form.Password)) {
      showToast("Invalid password / invalid confirm password", "error");
      return;
    }

    if (!validator.isEmail(form.Email)) {
      showToast("Invalide email", "error");
      return;
    }
    const data = await postEntity<User>(`${endpointUrl}`, form);
    if (data === null) {
      showToast("Null data", "error");
    } else {
      showToast("User added", "success");

      setTimeout(() => {
        window.history.back();
      }, 1000);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
        <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
          <h2 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
            Create user
          </h2>
        </div>
        <div className="max-w-2xl w-full p-8 bg-[var(--color-secondary)]/20 backdrop-blur-md rounded-2xl shadow-2xl">
          <div>
            <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
              User Name
              <input
                className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
                name="name"
                value={form.Name}
                onChange={(e) => setForm({ ...form, Name: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
              Email
              <input
                className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
                name="email"
                type="email"
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
              Role
            </label>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3 py-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            >
              {form.Role || "Select Role"}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 z-50 bg-[var(--color-secondary)]/20 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-gray-700">
                  {roles.map((role) => (
                    <li key={role}>
                      <button
                        onClick={() => handleSelect(role)}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {role}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
              Password
              <input
                className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
                name="password"
                type="password"
                value={form.Password}
                onChange={(e) => setForm({ ...form, Password: e.target.value })}
              />
            </label>
          </div>
        </div>
        <div>
          <button
            className="px-6 py-3 text-[var(--text-light)] bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-6 py-3 text-[var(--text-light)] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
export default AddUser;

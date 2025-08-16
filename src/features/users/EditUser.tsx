import { useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "./User";
import getEntity from "../../utils/GetEntity";
import { useQuery } from "@tanstack/react-query";
import putEntity from "../../utils/PutEntity";

function EditUser() {
  const roles = ["Client", "Admin", "Manager", "Courier"];
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;
  useQuery<User | null>({
    queryKey: ["users", id],
    enabled: !!id,
    queryFn: async () => {
      const result = await getEntity<User>(`${endpointUrl}${id}`);
      if (result) {
        setForm({
          name: result.Name,
          email: result.Email,
          password: "",
          role: result.Role,
        });
      }
      return result;
    },
  });

  const handleSave = async () => {
    const data = await putEntity(`${endpointUrl}${id}`, form);
    if (data === null) {
      console.log("Null data");
    } else {
      console.log("User updated", data);
      window.history.back();
    }
  };
  const handleSelect = (role: string) => {
    setForm({ ...form, role: role });
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
        <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
          <h2 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
            Edit user
          </h2>
        </div>
        <div className="max-w-2xl w-full p-8 bg-[var(--color-secondary)]/20 backdrop-blur-md rounded-2xl shadow-2xl">
          <div>
            <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
              User Name
              <input
                className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
              Email
              <input
                className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              {form.role}
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
                className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
                name="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
export default EditUser;

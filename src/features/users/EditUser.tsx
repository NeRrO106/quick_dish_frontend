import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { User } from "./User";
import getEntity from "../../utils/GetEntity";
import { useQuery } from "@tanstack/react-query";
import putEntity from "../../utils/PutEntity";
import validator from "validator";
import { showToast } from "../../utils/ShowToast";

function EditUser() {
  const roles = ["Client", "Admin", "Manager", "Courier"];
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!validator.isEmail(form.email)) {
      return showToast("Invalid email", "error");
    }

    if (form.password && !passwordPattern.test(form.password)) {
      return showToast(
        "Password must be at least 8 chars, include upper, lower, number, special char.",
        "error"
      );
    }

    try {
      const updated = await putEntity(`${endpointUrl}${id}`, form);
      if (!updated) return showToast("Update failed", "error");

      showToast("User updated", "success");
      navigate(-1);
    } catch (err) {
      console.error(err);
      showToast("Unexpected error", "error");
    }
  };

  const handleSelect = (role: string) => {
    setForm({ ...form, role });
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col items-center px-4">
      <h2 className="text-6xl font-extrabold text-[var(--text-light)] mb-6">
        Edit User
      </h2>

      <div className="max-w-2xl w-full p-8 bg-[var(--color-secondary)]/20 rounded-2xl shadow-2xl">
        <label className="block mb-4 text-md text-[var(--text-dark)]">
          Username
          <input
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label className="block mb-4 text-md text-[var(--text-dark)]">
          Email
          <input
            type="email"
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>

        <label className="block mb-4 text-md text-[var(--text-dark)]">
          Role
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full p-3 rounded-xl border bg-white/10 flex justify-between"
          >
            {form.role || "Select Role"}
            <span>▼</span>
          </button>
          {dropdownOpen && (
            <ul className="mt-2 bg-[var(--color-secondary)] rounded shadow">
              {roles.map((role) => (
                <li key={role}>
                  <button
                    onClick={() => handleSelect(role)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  >
                    {role}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>

        <label className="block mb-4 text-md text-[var(--text-dark)]">
          Password
          <input
            type="password"
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-3 text-[var(--text-light)] bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Save
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 text-[var(--text-light)] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Back
        </button>
      </div>
    </div>
  );
}
export default EditUser;

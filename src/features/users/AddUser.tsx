import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "./User";
import postEntity from "../../utils/PostEntity";
import validator from "validator";
import { showToast } from "../../utils/ShowToast";

function AddUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Password: "",
    Role: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const roles = ["Client", "Admin", "Manager", "Courier"];
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;

  const handleSelect = (role: string) => {
    setForm({ ...form, Role: role });
    setDropdownOpen(false);
  };

  const handleSave = async () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!form.Name || !form.Email || !form.Password || !form.Role) {
      return showToast("Please fill in all fields", "error");
    }

    if (!validator.isEmail(form.Email)) {
      return showToast("Invalid email", "error");
    }

    if (!passwordPattern.test(form.Password)) {
      return showToast(
        "Password must be at least 8 chars, include upper, lower, number, special char.",
        "error"
      );
    }

    try {
      const created = await postEntity<Partial<User>>(endpointUrl, form);
      if (!created) return showToast("Failed to create user", "error");

      showToast("User added successfully", "success");
      navigate(-1);
    } catch (err) {
      console.error(err);
      showToast("Unexpected error", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col items-center px-4">
      <h2 className="text-6xl font-extrabold text-[var(--text-light)] mb-6">
        Create User
      </h2>

      <div className="max-w-2xl w-full p-8 bg-[var(--color-secondary)]/20 rounded-2xl shadow-2xl">
        <label className="block mb-4 text-md text-[var(--text-dark)]">
          User Name
          <input
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.Name}
            onChange={(e) => setForm({ ...form, Name: e.target.value })}
          />
        </label>

        <label className="block mb-4 text-md text-[var(--text-dark)]">
          Email
          <input
            type="email"
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.Email}
            onChange={(e) => setForm({ ...form, Email: e.target.value })}
          />
        </label>

        <label className="block mb-4 text-md text-[var(--text-dark)]">
          Role
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full p-3 rounded-xl border bg-white/10 flex justify-between"
          >
            {form.Role || "Select Role"}
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
            value={form.Password}
            onChange={(e) => setForm({ ...form, Password: e.target.value })}
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
export default AddUser;

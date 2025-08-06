import { useState } from "react";
import type { User } from "./User";
import postEntity from "../../utils/PostEntity";

function AddUser() {
  const [form, setForm] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
    createdAt: "",
  });
  const roles = ["Client", "Admin", "Manager", "Courier"];
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (role: string) => {
    setForm({ ...form, role: role });
    setDropdownOpen(!dropdownOpen);
  };

  const handleSave = async () => {
    const data = await postEntity<User>(`${endpointUrl}`, form);
    if (data === null) {
      console.log("Null data");
    } else {
      console.log("Product updated", data);
      window.history.back();
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-sm p-6 dark:bg-purple-500 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md-5">
          Create user
        </h2>
        <div>
          <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
            User Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
            Role
          </label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {form.role || "Select Role"}
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
            <div className="absolute mt-2 z-50 bg-white dark:bg-gray-700 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
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
          <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
            Password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </>
  );
}
export default AddUser;

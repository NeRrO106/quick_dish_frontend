import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(`${apiUrl}/user`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const normalizedData = Array.isArray(data) ? data : [data];
        setUsers(normalizedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  });

  const handleDelete = (id: number) => {
    fetch(`${apiUrl}/user/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) <p>Loading...</p>;
  if (error) <p>{error}</p>;

  return (
    <div className="min-h-screen bg-emerald-500 flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-white space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Users Page
        </h1>
      </div>
      <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
        {users.map((user) => (
          <li
            key={user.id}
            className="w-64 p-2 border border-gray-200 rounded-lg shadow-sm bg-gray-800 border-gray-700 mb-4"
          >
            <p className="text-xl text-center font-semibold text-white mb-2">
              {user.name}
            </p>
            <p className="text-sm text-center font-medium text-white mb-2">
              {user.email}
            </p>
            <p className="text-xl font-bold text-white mb-2">
              {user.createdAt}
            </p>
            <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
              Edit user
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-red-900"
            >
              Delete user
            </button>
          </li>
        ))}
      </ul>
      {users.length === 0 && (
        <p className="text-lg md:text-xl font-light text-white">
          No items available in the user menu.
        </p>
      )}
    </div>
  );
}
export default Users;

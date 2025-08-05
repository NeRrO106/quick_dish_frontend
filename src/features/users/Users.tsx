import getEntity from "../../utils/GetEntity";
import deleteEntity from "../../utils/DeleteEntity";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "./User";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;
  const { data, isLoading, isError, error } = useQuery<User[] | null>({
    queryKey: ["users"],
    queryFn: () => getEntity<User[]>(endpointUrl),
  });

  const handleDelete = async (id: number) => {
    await deleteEntity(endpointUrl, id);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-emerald-500 flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-white space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Users Page
        </h1>
      </div>
      <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
        {data?.map((user) => (
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
            <p className="text-sm text-center font-medium text-white mb-2">
              {user.role}
            </p>
            <p className="text-xl font-bold text-white mb-2">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => navigate(`/users/${user.id}`)}
              className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
            >
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
      {data?.length === 0 && (
        <p className="text-lg md:text-xl font-light text-white">
          No items available in the user menu.
        </p>
      )}
    </div>
  );
}
export default Users;

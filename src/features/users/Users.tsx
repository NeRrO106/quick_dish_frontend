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
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <button
          onClick={() => navigate("/users/add")}
          className="text-[var(--text-light)] bg-[var(--color-accent3)] hover:bg-[var(--color-darker-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
        >
          Add user
        </button>
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Users Page
        </h1>
      </div>
      <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
        {data?.map((user) => (
          <li
            key={user.Id}
            className="w-64 p-2 border border-gray-200 rounded-lg shadow-sm bg-[var(--color-accent2)] border-[var(--color-secondary)] mb-4"
          >
            <p className="text-xl text-center font-semibold text-[var(--text-light)] mb-2">
              {user.Name}
            </p>
            <p className="text-sm text-center font-medium text-[var(--text-light)] mb-2">
              {user.Email}
            </p>
            <p className="text-sm text-center font-medium text-[var(--text-light)] mb-2">
              {user.Role}
            </p>
            <p className="text-xl font-bold text-[var(--text-light)] text-center mb-2">
              {new Date(user.CreatedAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/users/${user.Id}`)}
                className="text-[var(--text-light)] bg-[var(--color-accent1)] hover:bg-[var(--color-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
              >
                Edit user
              </button>
              <button
                onClick={() => handleDelete(user.Id)}
                className="text-[var(--text-light)] bg-red-700 hover:bg-red-900 font-medium rounded-full text-sm px-3 py-3 transition"
              >
                Delete user
              </button>
            </div>
          </li>
        ))}
      </ul>
      {data?.length === 0 && (
        <p className="text-lg md:text-xl font-light text-[var(--text-light)]">
          No items available in the user menu.
        </p>
      )}
    </div>
  );
}
export default Users;

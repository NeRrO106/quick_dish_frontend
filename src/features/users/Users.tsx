import getEntity from "../../utils/GetEntity";
import deleteEntity from "../../utils/DeleteEntity";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "./User";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/ShowToast";
import Loading from "../../components/Loading";

function Users() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;

  const { data, isLoading, isError, error } = useQuery<User[] | null>({
    queryKey: ["users"],
    queryFn: () => getEntity<User[]>(endpointUrl),
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteEntity(endpointUrl, id);
      showToast("User deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (err) {
      console.error(err);
      showToast("Error deleting user", "error");
    }
  };

  if (isLoading) return <Loading message="Loading..." />;
  if (isError)
    return <Loading message={`Error: ${(error as Error).message}`} />;

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col items-center px-4">
      <div className="text-center text-[var(--text-light)] mb-6">
        <h1 className="text-6xl font-extrabold mb-4">Users</h1>
        <button
          onClick={() => navigate("/users/add")}
          className="bg-[var(--color-accent3)] hover:bg-[var(--color-darker-accent3)] px-4 py-2 rounded-full transition"
        >
          Add User
        </button>
      </div>

      <ul className="flex flex-wrap justify-center gap-4">
        {data?.map((user) => (
          <li
            key={user.Id}
            className="w-64 p-4 bg-[var(--color-accent2)] rounded-lg shadow"
          >
            <p className="text-lg font-semibold text-center">{user.Name}</p>
            <p className="text-sm text-center">{user.Email}</p>
            <p className="text-sm text-center">{user.Role}</p>
            <p className="text-sm text-center">
              {new Date(user.CreatedAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-3 justify-center">
              <button
                onClick={() => navigate(`/users/${user.Id}`)}
                className="text-[var(--text-dark)] bg-[var(--color-accent1)] hover:bg-[var(--color-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.Id)}
                className="px-3 py-2 bg-red-700 text-white rounded-full hover:bg-red-900 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {data?.length === 0 && (
        <p className="text-lg text-[var(--text-dark)]">No users available.</p>
      )}
    </div>
  );
}
export default Users;

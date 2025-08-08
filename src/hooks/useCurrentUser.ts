import { useQuery } from "@tanstack/react-query";
import getEntity from "../utils/GetEntity";
import type { User } from "../features/users/User";

export function useCurrentUser() {
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;
  const { data, isLoading, error } = useQuery<
    User | null,
    unknown,
    User | null
  >({
    queryKey: ["currentUser"],
    queryFn: () => getEntity<User>(`${endpointUrl}me`),
  });
  return { data, isLoading, error };
}

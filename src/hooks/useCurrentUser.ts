import { useQuery } from "@tanstack/react-query";
import type { User } from "../features/users/User";

export function useCurrentUser() {
  const stored = localStorage.getItem("user");
  const initialUser = stored ? JSON.parse(stored) : null;

  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: () => initialUser,
    initialData: initialUser,
  });
}

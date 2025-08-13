import { useQuery } from "@tanstack/react-query";
import type { User } from "../features/users/User";

export function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    },
  });
}

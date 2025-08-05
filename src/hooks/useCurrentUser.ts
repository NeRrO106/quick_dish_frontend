import { useQuery } from "@tanstack/react-query";
import getEntity from "../utils/GetEntity";


export interface User{
    name: string,
    email: string,
    role: string
}
export function useCurrentUser(){
    
  const endpointUrl = import.meta.env.VITE_USERS_ENDPOINT;
  const { data, isLoading, error } = useQuery<User | null, unknown, User | null>({
    queryKey: ["currentUser"],
    queryFn: () => getEntity<User>(`${endpointUrl}me`),
    
  });
  return {data, isLoading, error};
}

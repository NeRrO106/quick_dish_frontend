import { useEffect, useState } from "react";


export interface User{
    name: string,
    email: string,
    role: string
}
export function useCurrentUser(){
    const apiUrl = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState <User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
    const fetchUser = async () => {
    try{
        const result = await fetch(`${apiUrl}/user/me`, {
            method: "GET",
            credentials: "include",
            headers: {
            Accept: "application/json",
            },
        });
        if(!result.ok){
            if(result.status === 401){
                setUser(null);
                return;
            }
            const message = await result.text();
            throw new Error(`Eroare ${result.status}: ${message}`);
        }
        const data: User = await result.json();
        setUser(data);
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message || "Eroare necunoscută");
        } else {
            setError("Eroare necunoscută");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [apiUrl]);
  return {user, loading, error};
}

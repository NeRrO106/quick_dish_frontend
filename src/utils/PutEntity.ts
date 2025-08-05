import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function putEntity<T>(url: string, data:T) {
    const response = await axios.put<T>(`${apiUrl}${url}`, data,{
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data ?? null
}
export default putEntity;
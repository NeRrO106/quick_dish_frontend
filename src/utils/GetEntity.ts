import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
async function getEntity<T>(url: string){
    const response = await axios.get<T>(`${apiUrl}${url}`, {
    withCredentials: true,
  });
    if(response.data !== null) return response.data;
    return null;
}

export default getEntity;
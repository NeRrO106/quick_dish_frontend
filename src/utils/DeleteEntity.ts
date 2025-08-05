import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
async function deleteEntity(url: string, id:number){
    const response = await axios.delete(`${apiUrl}${url}${id}`, {
    withCredentials: true,
  });
    if(response.data !== null) return response.data;
    return null;
}

export default deleteEntity;
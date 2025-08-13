import { useQuery } from "@tanstack/react-query";
import getEntity from "../../utils/GetEntity";
import deleteEntity from "../../utils/DeleteEntity";
import { useNavigate } from "react-router-dom";
import type { Product } from "./Product";

function Products() {
  const navigate = useNavigate();
  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;
  const { data, isLoading, isError, error } = useQuery<Product[] | null>({
    queryKey: ["products"],
    queryFn: () => getEntity<Product[]>(endpointUrl),
  });

  const handleDelete = async (id: number) => {
    await deleteEntity(endpointUrl, id);
  };

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-emerald-500 flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-white space-y-6">
        <button
          onClick={() => navigate("/products/add")}
          className="text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-red-900"
        >
          Add product
        </button>
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Product Page
        </h1>
      </div>
      <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
        {data?.map((prod) => (
          <li
            key={prod.Id}
            className="w-64 p-2 border border-gray-200 rounded-lg shadow-sm bg-gray-800 border-gray-700 mb-4"
          >
            <img
              src={prod.ImageUrl}
              alt={prod.Name}
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <p className="text-xl text-center font-semibold text-white mb-2">
              {prod.Name}
            </p>
            <p className="text-sm text-center font-medium text-white mb-2">
              {prod.Description}
            </p>
            <p className="text-sm text-center font-medium text-white mb-2">
              {prod.Category}
            </p>
            <p className="text-xl font-bold text-white mb-2">
              {prod.Price.toFixed(2)} lei
            </p>
            <button
              onClick={() => navigate(`/products/${prod.Id}`)}
              className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Edit product
            </button>
            <button
              onClick={() => handleDelete(prod.Id)}
              className="text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-red-900"
            >
              Delete product
            </button>
          </li>
        ))}
      </ul>
      {data?.length === 0 && (
        <p className="text-lg md:text-xl font-light text-white">
          No items available in the menu.
        </p>
      )}
    </div>
  );
}
export default Products;

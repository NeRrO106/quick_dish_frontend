import { useQuery } from "@tanstack/react-query";
import getEntity from "../../utils/GetEntity";
import deleteEntity from "../../utils/DeleteEntity";
import { useNavigate } from "react-router-dom";
import type { Product } from "./Product";
import { showToast } from "../../utils/ShowToast";

function Products() {
  const navigate = useNavigate();
  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;
  const { data, isLoading, isError, error } = useQuery<Product[] | null>({
    queryKey: ["products"],
    queryFn: () => getEntity<Product[]>(endpointUrl),
  });

  const handleDelete = async (id: number) => {
    showToast("Product deleted", "error");
    await deleteEntity(endpointUrl, id);
  };

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <button
          onClick={() => navigate("/products/add")}
          className="text-[var(--text-light)] bg-[var(--color-accent3)] hover:bg-[var(--color-darker-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
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
            className="w-64 p-2 border border-gray-200 rounded-lg shadow-sm bg-[var(--color-accent2)] border-[var(--color-secondary)] mb-4"
          >
            <img
              src={prod.ImageUrl}
              alt={prod.Name}
              loading="lazy"
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <p className="text-xl text-center font-semibold text-[var(--text-light)] mb-2">
              {prod.Name}
            </p>
            <p className="text-sm text-center font-medium text-[var(--text-light)] mb-2">
              {prod.Description}
            </p>
            <p className="text-sm text-center font-medium text-[var(--text-light)] mb-2">
              {prod.Category}
            </p>
            <p className="text-xl font-bold text-[var(--text-light)] mb-2">
              {prod.Price.toFixed(2)} lei
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/products/${prod.Id}`)}
                className="text-[var(--text-light)] bg-[var(--color-accent1)] hover:bg-[var(--color-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
              >
                Edit product
              </button>
              <button
                onClick={() => handleDelete(prod.Id)}
                className="text-[var(--text-light)] bg-red-700 hover:bg-red-900 font-medium rounded-full text-sm px-3 py-3 transition"
              >
                Delete product
              </button>
            </div>
          </li>
        ))}
      </ul>
      {data?.length === 0 && (
        <p className="text-lg md:text-xl font-light text-[var(--text-light)]">
          No items available in the menu.
        </p>
      )}
    </div>
  );
}
export default Products;

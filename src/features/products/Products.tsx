import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Product } from "./Product";
import getEntity from "../../utils/GetEntity";
import deleteEntity from "../../utils/DeleteEntity";
import { showToast } from "../../utils/ShowToast";

function Products() {
  const navigate = useNavigate();
  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;

  const { data, isLoading, isError, error } = useQuery<Product[] | null>({
    queryKey: ["products"],
    queryFn: () => getEntity<Product[]>(endpointUrl),
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteEntity(endpointUrl, id);
      showToast("Product deleted", "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting product", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col items-center px-4">
      <div className="text-center text-[var(--text-light)] mb-6">
        <h1 className="text-6xl font-extrabold mb-4">Products</h1>
        <button
          onClick={() => navigate("/products/add")}
          className="bg-[var(--color-accent3)] hover:bg-[var(--color-darker-accent3)] px-4 py-2 rounded-full transition"
        >
          Add Product
        </button>
      </div>

      <ul className="flex flex-wrap justify-center gap-4">
        {data?.map((prod) => (
          <li
            key={prod.Id}
            className="w-64 p-4 bg-[var(--color-accent2)] rounded-lg shadow"
          >
            <img
              src={prod.ImageUrl}
              alt={prod.Name}
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-[var(--text-dark)]">
              {prod.Name}
            </h3>
            <p className="text-sm text-[var(--text-dark)]">
              {prod.Description}
            </p>
            <p className="text-sm text-[var(--text-dark)]">{prod.Category}</p>
            <p className="text-xl font-bold text-[var(--text-dark)]">
              {prod.Price.toFixed(2)} lei
            </p>
            <div className="flex gap-2 mt-3 justify-center">
              <button
                onClick={() => navigate(`/products/${prod.Id}`)}
                className="text-[var(--text-dark)] bg-[var(--color-accent1)] hover:bg-[var(--color-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(prod.Id)}
                className="px-3 py-2 bg-red-700 text-white rounded-full hover:bg-red-900 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {data?.length === 0 && (
        <p className="text-lg text-[var(--text-dark)]">
          No products available.
        </p>
      )}
    </div>
  );
}
export default Products;

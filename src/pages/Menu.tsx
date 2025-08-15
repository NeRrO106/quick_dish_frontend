import { useQuery } from "@tanstack/react-query";
import getEntity from "../utils/GetEntity";
import type { Product } from "../features/products/Product";
import { useCart } from "../features/cart/useCart";
import { useNavigate } from "react-router-dom";

function Menu() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;
  const { data, isLoading, isError, error } = useQuery<Product[] | null>({
    queryKey: ["products"],
    queryFn: () => getEntity<Product[]>(endpointUrl),
  });

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Menu Page
        </h1>
      </div>
      <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
        {data?.map((prod) => (
          <li
            key={prod.Id}
            className="w-64 p-2 border border-gray-200 rounded-lg shadow-sm bg-[var(--color-accent2)] border-[var(--color-secondary)] mb-4"
          >
            {prod.ImageUrl ? (
              <img
                src={prod.ImageUrl}
                alt={prod.Name}
                className="w-full h-36 object-cover rounded-lg mb-3"
              />
            ) : (
              <div>No image</div>
            )}
            <p className="text-xl text-center font-semibold text-[var(--text-light)] mb-2">
              {prod.Name}
            </p>
            <p className="text-sm text-center font-medium text-[var(--text-light)] mb-2">
              {prod.Description}
            </p>
            <p className="text-xl font-bold text-[var(--text-light)] mb-2">
              {prod.Price.toFixed(2)} lei
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/productdetails/${prod.Id}`)}
                className="text-[var(--text-light)] bg-[var(--color-accent1)] hover:bg-[var(--color-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
              >
                View Product
              </button>
              <button
                onClick={() => addToCart(prod.Id, 1, prod.Price)}
                className="text-[var(--text-light)] bg-[var(--color-accent1)] hover:bg-[var(--color-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
              >
                Add to cart
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
export default Menu;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../cart/useCart";
import getEntity from "../../utils/GetEntity";
import type { Product } from "./Product";
import { showToast } from "../../utils/ShowToast";

function ProductDetail() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string }>();
  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;
  const { data, isLoading, isError, error } = useQuery<Product | null>({
    queryKey: ["products", id],
    queryFn: () => getEntity<Product>(`${endpointUrl}${id}`),
  });

  const handleQuantity = (value: number) => {
    setQuantity((q) => {
      const newQuantity = q + value;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  const handleAddToCart = (
    id: number,
    quantity: number,
    price: number,
    name: string
  ) => {
    showToast("Produs adaugat in cos cu succes!", "success");
    addToCart(id, quantity, price, name);
  };

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="max-w mx-auto p-6 bg-[var(--color-secondary)] shadow-2xl flex flex-col md:flex-row gap-8">
      <div className="flex-1 relative group overflow-hidden rounded-xl">
        <img
          src={data?.ImageUrl}
          alt={data?.Name}
          className="w-full h-96 object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-[var(--text-dark)]">
            {data?.Name}
          </h1>
          <p className="mt-2 text-[var(--text-dark)] leading-relaxed">
            {data?.Description}
          </p>
          <p className="mt-4 text-2xl font-bold text-[var(--color-darker-accent3)] shadow-sm">
            {data?.Price.toFixed(2)} lei
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleQuantity(-1)}
              className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--text-light)] font-semibold shadow-lg transition-transform duration-200 hover:scale-85 hover:shadow-xl hover:bg-[var(--color-accent1)]"
            >
              -
            </button>
            <span className="text-xl font-medium text-[var(--text-dark)]">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantity(+1)}
              className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--text-light)] font-semibold shadow-lg transition-transform duration-200 hover:scale-85 hover:shadow-xl hover:bg-[var(--color-accent1)]"
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              if (data) {
                handleAddToCart(data.Id, quantity, data.Price, data.Name);
              }
            }}
            disabled={!data}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent2)] text-[var(--text-light)] font-medium shadow-xl transition-transform duration-200 hover:scale-85 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 21"
            >
              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;

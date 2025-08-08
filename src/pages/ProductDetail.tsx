import { useQuery } from "@tanstack/react-query";
import getEntity from "../utils/GetEntity";
import type { Product } from "../features/products/Product";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../features/cart/useCart";

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

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <img
          src={data?.imageUrl}
          alt={data?.name}
          className="w-full h-64 object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold mt-4">{data?.name}</h1>
        <p className="mt-2 text-gray-700">{data?.description}</p>
        <p className="text-xl font-semibold mt-4">
          {data?.price.toFixed(2)} lei
        </p>
      </div>
      <div>
        <button
          onClick={() => handleQuantity(-1)}
          className="bg-gray-300 px-3 rounded"
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          onClick={() => handleQuantity(+1)}
          className="bg-gray-300 px-3 rounded"
        >
          +
        </button>
        <button
          onClick={() => {
            if (data) {
              addToCart(data.id, quantity, data.price);
            }
          }}
          className="bg-gray-300 px-3"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
export default ProductDetail;

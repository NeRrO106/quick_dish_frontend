import { useQuery } from "@tanstack/react-query";
import getEntity from "../utils/GetEntity";
import type { Product } from "../features/products/Product";
import { useCart } from "../features/cart/useCart";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/ShowToast";
import { useMemo, useState } from "react";

function Menu() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;
  const { data, isLoading, isError, error } = useQuery<Product[] | null>({
    queryKey: ["products"],
    queryFn: () => getEntity<Product[]>(endpointUrl),
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.Role;

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("default");

  const handleAddToCart = (
    id: number,
    quantity: number,
    price: number,
    name: string
  ) => {
    if (role === "Guest") {
      showToast("Nu poti plasa o comanda ca si oaspete!", "warning");
      return;
    }
    showToast("Produs adaugat in cos cu succes!", "success");
    addToCart(id, quantity, price, name);
  };

  const handleViewProduct = (id: number) => {
    if (role === "Guest") {
      showToast("Nu poti vizualiza un produs ca si oaspete!", "warning");
      return;
    }
    navigate(`/productdetails/${id}`);
  };

  const filteredAndStored = useMemo(() => {
    if (!data) return [];
    let products = [...data];

    if (selectedCategory !== "all") {
      products = products.filter((p) => p.Category === selectedCategory);
    }

    if (sortOption === "name-asc") {
      products.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortOption === "name-desc") {
      products.sort((a, b) => b.Name.localeCompare(a.Name));
    } else if (sortOption === "price-asc") {
      products.sort((a, b) => a.Price - b.Price);
    } else if (sortOption === "price-desc") {
      products.sort((a, b) => b.Price - a.Price);
    }
    return products;
  }, [data, selectedCategory, sortOption]);

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Menu Page
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded-lg bg-[var(--color-accent2)] text-[var(--text-light)]"
        >
          <option value="all">All Categories</option>
          <option value="Pizza">Pizza</option>
          <option value="Burgeri">Burgeri</option>
          <option value="Salate">Salate</option>
          <option value="Paste">Paste</option>
          <option value="Ciorbe">Ciorbe</option>
          <option value="Grill">Grill</option>
          <option value="Pește">Pește</option>
          <option value="Desert">Desert</option>
          <option value="Băuturi">Băuturi</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 rounded-lg bg-[var(--color-accent2)] text-[var(--text-light)]"
        >
          <option value="default">Default</option>
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
        </select>
      </div>
      <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
        {filteredAndStored.map((prod) => (
          <li
            key={prod.Id}
            className="w-64 p-2 border border-gray-200 rounded-lg shadow-sm bg-[var(--color-accent2)] border-[var(--color-secondary)] mb-4"
          >
            {prod.ImageUrl ? (
              <img
                src={prod.ImageUrl}
                alt={prod.Name}
                loading="lazy"
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
                onClick={() => handleViewProduct(prod.Id)}
                className="text-[var(--text-light)] bg-[var(--color-accent1)] hover:bg-[var(--color-accent3)] font-medium rounded-full text-sm px-3 py-3 transition"
              >
                View Product
              </button>
              <button
                onClick={() =>
                  handleAddToCart(prod.Id, 1, prod.Price, prod.Name)
                }
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

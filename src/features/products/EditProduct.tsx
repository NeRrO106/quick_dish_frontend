import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "./Product";
import getEntity from "../../utils/GetEntity";
import { useQuery } from "@tanstack/react-query";
import putEntity from "../../utils/PutEntity";

function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    ImageUrl: "",
  });
  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;
  useQuery<Product | null>({
    queryKey: ["products", id],
    enabled: !!id,
    queryFn: async () => {
      const result = await getEntity<Product>(`${endpointUrl}${id}`);
      if (result) {
        setForm({
          name: result.Name,
          description: result.Description,
          price: result.Price,
          category: result.Category,
          ImageUrl: result.ImageUrl,
        });
      }
      return result;
    },
  });

  const handleSave = async () => {
    const data = await putEntity(`${endpointUrl}${id}`, form);
    if (data === null) {
      console.log("Null data");
    } else {
      console.log("Product updated", data);
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h2 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Edit Product
        </h2>
      </div>
      <div className="max-w-2xl w-full p-8 bg-[var(--color-secondary)]/20 backdrop-blur-md rounded-2xl shadow-2xl">
        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Product Name
            <input
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Product Description
            <input
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Product Category
          </label>
          <input
            className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            name="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Product Price
          </label>
          <input
            className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: parseFloat(e.target.value) })
            }
          />
        </div>
      </div>
      <div>
        <button
          className="px-6 py-3 text-[var(--text-light)] bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-6 py-3 text-[var(--text-light)] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}
export default EditProduct;

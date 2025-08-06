import { useState } from "react";
import type { Product } from "./Product";
import postEntity from "../../utils/PostEntity";

function EditProduct() {
  const [form, setForm] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    category: "",
    ImageUrl: "",
  });
  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;

  const handleSave = async () => {
    const data = await postEntity<Product>(`${endpointUrl}`, form);
    if (data === null) {
      console.log("Null data");
    } else {
      console.log("Product updated", data);
      window.history.back();
    }
  };
  return (
    <>
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-sm p-6 dark:bg-purple-500 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md-5">
          Edit Product
        </h2>
        <div>
          <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
            Product Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
            Product Description
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
            Product Category
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            name="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
            Product Price
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: parseFloat(e.target.value) })
            }
          />
        </div>
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </>
  );
}
export default EditProduct;

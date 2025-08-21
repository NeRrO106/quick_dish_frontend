import { useState } from "react";
import type { Product } from "./Product";
import postEntity from "../../utils/PostEntity";
import storage from "../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { showToast } from "../../utils/ShowToast";

function AddProduct() {
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({
    Id: 0,
    Name: "",
    Description: "",
    Price: 0,
    Category: "",
    ImageUrl: "",
  });
  const endpointUrl = import.meta.env.VITE_PRODUCTS_ENDPOINT;

  const handleSave = async () => {
    if (
      !form.Name.trim() ||
      !form.Description.trim() ||
      !form.Category.trim() ||
      form.Price <= 0 ||
      !form.ImageUrl
    ) {
      showToast(
        "Toate câmpurile sunt obligatorii și prețul trebuie să fie mai mare decât 0.",
        "error"
      );
      return;
    }
    const data = await postEntity<Product>(`${endpointUrl}`, form);
    if (data === null) {
      showToast("Null data", "error");
    } else {
      showToast("Product added", "success");

      setTimeout(() => {
        window.history.back();
      }, 1000);
    }
  };

  const upload = async () => {
    if (!image) return;
    const storageRef = ref(storage, `/${image?.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    setForm({ ...form, ImageUrl: url });
  };

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h2 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Add Product
        </h2>
      </div>
      <div className="max-w-2xl w-full p-8 bg-[var(--color-secondary)]/20 backdrop-blur-md rounded-2xl shadow-2xl">
        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Product Name
            <input
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              name="name"
              value={form.Name}
              onChange={(e) => setForm({ ...form, Name: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Product Description
            <input
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              name="description"
              value={form.Description}
              onChange={(e) =>
                setForm({ ...form, Description: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Product Category
            <input
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              name="category"
              value={form.Category}
              onChange={(e) => setForm({ ...form, Category: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Product Price
            <input
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              name="price"
              type="number"
              step="0.01"
              value={form.Price}
              onChange={(e) =>
                setForm({ ...form, Price: parseFloat(e.target.value) })
              }
            />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-md font-medium text-[var(--text-dark)]">
            Image
            <input
              type="file"
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                } else {
                  setImage(null);
                }
              }}
            />
          </label>
        </div>
        <button
          className="py-2 px-2 text-[var(--text-dark)] bg-[var(--color-accent1)] hover:bg-[var(--color-accent3)] font-bold rounded-xl shadow-lg hover:scale-105 transform transition"
          onClick={upload}
        >
          Upload
        </button>
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
export default AddProduct;

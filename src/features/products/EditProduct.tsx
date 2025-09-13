import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "./Product";
import getEntity from "../../utils/GetEntity";
import putEntity from "../../utils/PutEntity";
import { showToast } from "../../utils/ShowToast";
import storage from "../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState<Omit<Product, "Id">>({
    Name: "",
    Description: "",
    Price: 0,
    Category: "",
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
          Name: result.Name,
          Description: result.Description,
          Price: result.Price,
          Category: result.Category,
          ImageUrl: result.ImageUrl,
        });
      }
      return result;
    },
  });

  const handleSave = async () => {
    try {
      let imageUrl = form.ImageUrl;

      if (image) {
        const storageRef = ref(storage, `products/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const updated = await putEntity(`${endpointUrl}${id}`, {
        ...form,
        ImageUrl: imageUrl,
      });

      if (!updated) return showToast("Failed to update product.", "error");

      showToast("Product updated!", "success");
      navigate(-1);
    } catch (err) {
      console.error(err);
      showToast("Unexpected error updating product.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col items-center justify-center px-4">
      <h2 className="text-6xl font-extrabold text-[var(--text-light)] mb-6">
        Edit Product
      </h2>

      <div className="max-w-2xl w-full p-8 bg-[var(--color-secondary)]/20 rounded-2xl shadow-2xl space-y-4">
        <label className="block text-md font-medium text-[var(--text-dark)]">
          Product Name
          <input
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.Name}
            onChange={(e) => setForm({ ...form, Name: e.target.value })}
          />
        </label>

        <label className="block text-md font-medium text-[var(--text-dark)]">
          Description
          <input
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.Description}
            onChange={(e) => setForm({ ...form, Description: e.target.value })}
          />
        </label>

        <label className="block text-md font-medium text-[var(--text-dark)]">
          Category
          <input
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.Category}
            onChange={(e) => setForm({ ...form, Category: e.target.value })}
          />
        </label>

        <label className="block text-md font-medium text-[var(--text-dark)]">
          Price
          <input
            type="number"
            step="0.01"
            className="w-full p-3 rounded-xl border bg-white/10"
            value={form.Price}
            onChange={(e) => setForm({ ...form, Price: +e.target.value })}
          />
        </label>

        <label className="block text-md font-medium text-[var(--text-dark)]">
          Image
          <div className="mt-2 flex flex-col items-center border-2 border-dashed border-gray-400 p-4 rounded-xl cursor-pointer hover:border-gray-600 transition">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-xl mb-2"
              />
            ) : form.ImageUrl ? (
              <img
                src={form.ImageUrl}
                alt="Current"
                className="w-40 h-40 object-cover rounded-xl mb-2"
              />
            ) : (
              <p className="text-gray-400">Click to select an image</p>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="px-4 py-2 bg-[var(--color-primary)] text-[var(--text-light)] rounded-full mt-2 cursor-pointer hover:bg-[var(--color-accent1)] transition"
            >
              {image ? "Change Image" : "Select Image"}
            </label>
          </div>
        </label>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          className="px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
export default EditProduct;

import { useEffect, useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  ImageUrl: string;
}

function Products() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/product`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const normalizedData = Array.isArray(data) ? data : [data];
        setMenuItems(normalizedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-emerald-500 flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-white space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Product Page
        </h1>
      </div>
      <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="w-64 p-2 border border-gray-200 rounded-lg shadow-sm bg-gray-800 border-gray-700 mb-4"
          >
            <img
              src={item.ImageUrl}
              alt={item.name}
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <p className="text-xl text-center font-semibold text-white mb-2">
              {item.name}
            </p>
            <p className="text-sm text-center font-medium text-white mb-2">
              {item.description}
            </p>
            <p className="text-xl font-bold text-white mb-2">
              {item.price.toFixed(2)} lei
            </p>
            <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
              Edit product
            </button>
            <button className="text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-red-900">
              Delete product
            </button>
          </li>
        ))}
      </ul>
      {menuItems.length === 0 && (
        <p className="text-lg md:text-xl font-light text-white">
          No items available in the menu.
        </p>
      )}
    </div>
  );
}
export default Products;

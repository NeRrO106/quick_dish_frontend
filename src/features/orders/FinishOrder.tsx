import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../cart/useCart";
import postEntity from "../../utils/PostEntity";
import validator from "validator";
import { showToast } from "../../utils/ShowToast";

function FinishOrder() {
  const { cart, totalAmount } = useCart();
  const [formData, setFormData] = useState({
    address: "",
    userId: 0,
    email: "",
    phone: "",
    paymentMethod: "cash",
    notes: "",
  });

  const [error, setError] = useState("");
  const endpoint = import.meta.env.VITE_ORDERS_ENDPOINT;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        userId: storedUser.Id,
      }));
    }
  }, []);

  const handleFinishOrder = async () => {
    if (!formData.address || !formData.phone) {
      setError("Address and phone number are required.");
      showToast("Address and phone number are required.", "error");
      return;
    }
    if (!validator.isMobilePhone(formData.phone, "ro-RO")) {
      setError("Invalid phone number");
      showToast("Invalid phone number", "error");
      return;
    }
    const orderData = {
      UserName: "",
      CourierName: "",
      Address: formData.address,
      PhoneNumber: formData.phone,
      TotalAmount: totalAmount(),
      Notes: formData.notes.trim() === "" ? "" : formData.notes,
      PaymentMethod: formData.paymentMethod,
      UserId: formData.userId,
      items: cart.map((item) => ({
        ProductId: item.id,
        Quantity: item.quantity,
        UnitPrice: item.price,
      })),
    };
    try {
      await postEntity(`${endpoint}`, orderData);
      localStorage.removeItem("cart");
      showToast("Order placed successfully!", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error placing order:", error);
      setError("An error occurred while placing your order. Please try again.");
      showToast(
        "An error occurred while placing your order. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="max-w mx-auto p-6 bg-[var(--color-secondary)] shadow-2xl gap-8">
      <h1 className="text-3xl font-extrabold text-center text-[var(--text-dark)] mb-6">
        Complete Your Order
      </h1>
      {error && <p className="text-[var(--color-accent2)]">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2">
          Delivery Address*:
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            required
          />
        </label>
        <label className="block mb-2">
          Phone*:
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            required
          />
        </label>
        <label className="block mb-2">
          Payment Method:
          <select
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
            className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
          >
            <option value="cash">Numerar</option>
            <option value="card">Card</option>
          </select>
        </label>
        <label className="block mb-2">
          Additional Notes:
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 placeholder-white/70 text-[var(--text-dark)] focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
          />
        </label>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
        <p className="font-bold">Total: {totalAmount()} lei</p>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map(
              (item: {
                id: number;
                quantity: number;
                price: number;
                name: string;
              }) => (
                <li key={item.id} className="mb-2">
                  <p>
                    {item.name}, Quantity: {item.quantity}, Price: {item.price}{" "}
                    lei, Subtotal: {(item.price * item.quantity).toFixed(2)} lei
                  </p>
                </li>
              )
            )}
          </ul>
        )}
      </div>
      <button
        onClick={handleFinishOrder}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent2)] text-[var(--text-light)] font-medium shadow-xl transition-transform duration-200 hover:scale-85 hover:shadow-xl"
      >
        Place Order
      </button>
    </div>
  );
}
export default FinishOrder;

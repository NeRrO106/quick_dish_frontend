import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/useCart";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import postEntity from "../../utils/PostEntity";
import { showToast } from "../../utils/ShowToast";

type FormData = {
  address: string;
  phone: string;
  paymentMethod: "cash" | "card";
  notes: string;
};

function FinishOrder() {
  const { cart, totalAmount } = useCart();
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    address: "",
    phone: "",
    paymentMethod: "cash",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const endpoint = import.meta.env.VITE_ORDERS_ENDPOINT;

  const handleFinishOrder = async () => {
    if (!formData.address || !formData.phone) {
      return showToast("Address and phone number are required.", "error");
    }
    if (!/^(?:\+40|0)?7\d{2}[-\s]?\d{3}[-\s]?\d{3}$/.test(formData.phone)) {
      return showToast("Invalid phone number", "error");
    }
    if (cart.length === 0) return showToast("Cart is empty", "error");

    const orderData = {
      UserId: user?.Id,
      UserName: user?.Name ?? "",
      CourierName: "",
      Address: formData.address,
      PhoneNumber: formData.phone,
      TotalAmount: totalAmount(),
      Notes: formData.notes.trim(),
      PaymentMethod: formData.paymentMethod,
      items: cart.map((item) => ({
        ProductId: item.id,
        Quantity: item.quantity,
        UnitPrice: item.price,
      })),
    };

    setLoading(true);
    showToast("Placing your order...", "warning");

    try {
      await postEntity(endpoint, orderData);
      localStorage.removeItem("cart");
      showToast("Order placed successfully!", "success");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error placing order:", err);
      showToast("An error occurred while placing your order.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w mx-auto p-6 bg-[var(--color-secondary)] shadow-2xl flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-[var(--text-dark)] text-center md:text-left">
          Complete Your Order
        </h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-semibold text-[var(--text-dark)]">
              Delivery Address*
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[var(--text-dark)]">
              Phone*
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[var(--text-dark)]">
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentMethod: e.target.value as "cash" | "card",
                })
              }
              className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[var(--text-dark)]">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-[var(--text-dark)] text-center md:text-left">
          Cart Items
        </h2>
        <p className="font-bold text-[var(--text-dark)]">
          Total: {totalAmount()} lei
        </p>

        {cart.length === 0 ? (
          <p className="text-[var(--text-dark)]">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <li
                key={item.id}
                className="p-2 bg-[var(--color-accent1)] rounded-lg flex justify-between"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{(item.price * item.quantity).toFixed(2)} lei</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleFinishOrder}
          disabled={cart.length === 0 || loading}
          className="mt-4 w-full px-6 py-3 rounded-lg bg-[var(--color-accent2)] text-[var(--text-light)] font-medium shadow-xl transition hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Placing Order..."
            : cart.length === 0
            ? "Cart Empty"
            : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default FinishOrder;

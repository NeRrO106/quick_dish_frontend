import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../cart/useCart";
import postEntity from "../../utils/PostEntity";
import { showToast } from "../../utils/ShowToast";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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

  const endpoint = import.meta.env.VITE_ORDERS_ENDPOINT;

  const handleFinishOrder = async () => {
    if (!formData.address || !formData.phone) {
      return showToast("Address and phone number are required.", "error");
    }
    if (!/^(?:\+40|0)?7\d{2}[-\s]?\d{3}[-\s]?\d{3}$/.test(formData.phone)) {
      return showToast("Invalid phone number", "error");
    }

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
    showToast("Placing your order...", "warning");
    try {
      await postEntity(endpoint, orderData);
      localStorage.removeItem("cart");
      showToast("Order placed successfully!", "success");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error placing order:", err);
      showToast("An error occurred while placing your order.", "error");
    }
  };

  return (
    <div className="max-w mx-auto p-6 bg-[var(--color-secondary)] shadow-2xl gap-8">
      <h1 className="text-3xl font-extrabold text-center text-[var(--text-dark)] mb-6">
        Complete Your Order
      </h1>

      <div className="mb-4 space-y-4">
        <input
          type="text"
          placeholder="Delivery Address*"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
        />
        <input
          type="tel"
          placeholder="Phone*"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
        />
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
          <option value="cash">Numerar</option>
          <option value="card">Card</option>
        </select>
        <textarea
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
        <p className="font-bold">Total: {totalAmount()} lei</p>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-1">
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} — Qty: {item.quantity}, Price: {item.price} lei →{" "}
                {(item.price * item.quantity).toFixed(2)} lei
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleFinishOrder}
        className="px-6 py-3 rounded-lg bg-[var(--color-accent2)] text-[var(--text-light)] font-medium shadow-xl transition hover:scale-95"
      >
        Place Order
      </button>
    </div>
  );
}

export default FinishOrder;

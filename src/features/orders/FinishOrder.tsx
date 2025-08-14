//import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../cart/useCart";
import postEntity from "../../utils/PostEntity";

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
      setError("Adresa și telefonul sunt obligatorii.");
      return;
    }
    const orderData = {
      UserName: "",
      CourierName: "",
      Address: formData.address,
      PhoneNumber: Number(formData.phone),
      TotalAmount: totalAmount(),
      Notes: formData.notes,
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
    } catch (error) {
      console.error("Error placing order:", error);
      setError(
        "A apărut o eroare la plasarea comenzii. Vă rugăm să încercați din nou."
      );
    }
    localStorage.removeItem("cart");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Finalizează Comanda</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2">
          Adresă de livrare*:
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Telefon*:
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Metodă de plată:
          <select
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="cash">Numerar</option>
            <option value="card">Card</option>
          </select>
        </label>
        <label className="block mb-2">
          Note suplimentare:
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </label>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Produse în coș</h2>
        <p className="font-bold">Total: {totalAmount()} lei</p>
        {cart.length === 0 ? (
          <p>Coșul este gol.</p>
        ) : (
          <ul>
            {cart.map(
              (item: { id: number; quantity: number; price: number }) => (
                <li key={item.id} className="mb-2">
                  <p>
                    Produs ID: {item.id}, Cantitate: {item.quantity}, Preț:{" "}
                    {item.price} lei, Subtotal:{" "}
                    {(item.price * item.quantity).toFixed(2)} lei
                  </p>
                </li>
              )
            )}
          </ul>
        )}
      </div>
      <button
        onClick={handleFinishOrder}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Plasează comanda
      </button>
    </div>
  );
}
export default FinishOrder;

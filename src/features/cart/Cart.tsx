import { useNavigate } from "react-router-dom";
import { useCart } from "./useCart";
import { showToast } from "../../utils/ShowToast";

function Cart() {
  const { cart, addToCart, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.Role;

  const handleIncrede = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item) addToCart(id, 1, item.price, item.name);
  };

  const handleDecrese = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item && item.quantity > 1) addToCart(id, -1, item.price, item.name);
    else removeFromCart(id);
  };

  const handleFinishOrder = () => {
    if (role === "Guest") {
      showToast(
        "Nu poți plasa o comandă ca oaspete! Trebuie sa te loghezi!",
        "warning"
      );
      return;
    }
    navigate("/orders/finish");
  };

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-secondary)]">
        <p className="text-center text-xl text-[var(--text-dark)]">
          Cart is empty
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-secondary)] px-4">
      <h1 className="text-3xl font-extrabold text-center text-[var(--text-dark)] mb-6">
        Your Cart
      </h1>

      <div className="flex-grow w-full max-w-screen-xl mx-auto flex flex-col gap-6">
        <ul className="flex flex-col gap-6 w-full">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center w-full bg-[var(--color-secondary)]/15 p-4 rounded-xl shadow hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-1 w-full">
                <p className="font-semibold text-lg">
                  Produs Name: {item.name}
                </p>
                <p className="text-gray-700">Cantitate: {item.quantity}</p>
                <p className="text-gray-700">Preț unitar: {item.price} lei</p>
                <p className="font-bold text-[var(--color-darker-accent3)] mt-1">
                  Subtotal: {(item.price * item.quantity).toFixed(2)} lei
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleDecrese(item.id)}
                  className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--text-light)] font-semibold shadow-lg hover:bg-[var(--color-accent1)] transition"
                >
                  -
                </button>
                <button
                  onClick={() => handleIncrede(item.id)}
                  className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--text-light)] font-semibold shadow-lg hover:bg-[var(--color-accent1)] transition"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--text-light)] font-semibold shadow-lg hover:bg-[var(--color-accent2)] transition"
                >
                  Sterge
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="flex justify-between items-center mt-6 p-4 bg-[var(--color-secondary)]/15 text-[var(--text-dark)] font-bold rounded-xl shadow-lg w-full">
          Total {totalAmount().toFixed(2)} lei
        </p>

        <button
          onClick={handleFinishOrder}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent2)] text-[var(--text-light)] font-medium shadow-xl hover:scale-105 transition-transform duration-200 w-full md:w-auto mx-auto"
        >
          Finish Order
        </button>
      </div>
    </div>
  );
}

export default Cart;

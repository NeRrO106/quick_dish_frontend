import { useNavigate } from "react-router-dom";
import { useCart } from "./useCart";

function Cart() {
  const { cart, addToCart, removeFromCart, totalAmount } = useCart();

  const navigate = useNavigate();

  const handleIncrede = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item) {
      addToCart(id, 1, item.price, item.name);
    }
  };

  const handleDecrese = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item && item.quantity > 1) {
      addToCart(id, -1, item.price, item.name);
    } else {
      removeFromCart(id);
    }
  };

  if (cart.length === 0)
    return (
      <p className="text-center text-xl text-[var(--text-dark)] mt-10">
        Cart is empty
      </p>
    );

  return (
    <div className="max-w mx-auto p-6 bg-[var(--color-secondary)] shadow-2xl gap-8">
      <h1 className="text-3xl font-extrabold text-center text-[var(--text-dark)] mb-6">
        Your Cart
      </h1>
      <ul className="flex flex-col gap-6">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-center bg-[var(--color-secondary)]/15 p-4 rounded-xl shadow hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <p className="font-semibold text-lg">Prodcus Name: {item.name}</p>
              <p className="text-gray-700">Cantitate: {item.quantity}</p>
              <p className="text-gray-700">Preț unitar: {item.price} lei</p>
              <p className="font-bold text-[var(--color-darker-accent3)] mt-1">
                Subtotal: {(item.price * item.quantity).toFixed(2)} lei
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button
                onClick={() => handleDecrese(item.id)}
                className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--text-light)] font-semibold shadow-lg transition-transform duration-200 hover:scale-85 hover:shadow-xl hover:bg-[var(--color-accent1)]"
              >
                -
              </button>
              <button
                onClick={() => handleIncrede(item.id)}
                className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--text-light)] font-semibold shadow-lg transition-transform duration-200 hover:scale-85 hover:shadow-xl hover:bg-[var(--color-accent1)]"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--text-light)] font-semibold shadow-lg transition-transform duration-200 hover:scale-85 hover:shadow-xl hover:bg-[var(--color-accent2)]"
              >
                Sterge
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="flex justify-between items-center mt-6 p-4 bg-[var(--color-secondary)]/15 text-[var(--text-dark)] font-bold rounded-xl shadow-lg">
        Total {totalAmount().toFixed(2)} lei
      </p>
      <button
        onClick={() => navigate("/orders/finish")}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent2)] text-[var(--text-light)] font-medium shadow-xl transition-transform duration-200 hover:scale-85 hover:shadow-xl"
      >
        Finalizează comanda
      </button>
    </div>
  );
}
export default Cart;

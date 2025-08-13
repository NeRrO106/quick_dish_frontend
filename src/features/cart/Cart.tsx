import { useCart } from "./useCart";

function Cart() {
  const { cart, addToCart, removeFromCart, totalAmount } = useCart();

  const handleIncrede = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item) {
      addToCart(id, 1, item.price);
    }
  };

  const handleDecrese = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item && item.quantity > 1) {
      addToCart(id, -1, item.price);
    } else {
      removeFromCart(id);
    }
  };

  if (cart.length === 0) return <p> Cart is empty</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1>Cart Page</h1>
      <ul>
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center mb-4 border-b pb-2"
          >
            <div>
              <p>Produs ID: {item.id}</p>
              <p>Cantitate: {item.quantity}</p>
              <p>Preț unitar: {item.price} lei</p>
              <p>Subtotal: {(item.price * item.quantity).toFixed(2)} lei</p>
            </div>
            <div>
              <button
                onClick={() => handleDecrese(item.id)}
                className="bg-gray-300 px-3 rounded"
              >
                -
              </button>
              <button
                onClick={() => handleIncrede(item.id)}
                className="bg-gray-300 px-3 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-gray-300 px-3"
              >
                Sterge
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total {totalAmount().toFixed(2)} lei</p>
      <button
        onClick={() => alert("Pasul următor: finalizare comandă")}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
      >
        Finalizează comanda
      </button>
    </div>
  );
}
export default Cart;

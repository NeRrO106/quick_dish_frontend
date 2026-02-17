import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { Order } from "./Order";
import getEntity from "../../utils/GetEntity";
import Loading from "../../components/Loading";

function MyOrder() {
  const { id } = useParams();
  const endpointUrl = import.meta.env.VITE_ORDERS_ENDPOINT;

  const { data, isLoading, isError, error } = useQuery<Order[] | null>({
    queryKey: ["orders", id],
    queryFn: () => getEntity<Order[]>(`${endpointUrl}orders/${id}`),
  });

  if (isLoading) return <Loading message="Loading..." />;
  if (isError)
    return <Loading message={`Error: ${(error as Error).message}`} />;
  if (!data || data.length === 0) return <Loading message="No orders." />;

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col items-center px-4">
      <h1 className="text-6xl font-extrabold tracking-tight text-[var(--text-light)] drop-shadow-lg mt-8">
        Orders Page
      </h1>

      <ul className="flex flex-wrap justify-center gap-4 mt-8">
        {data.map((order) => (
          <li
            key={order.Id}
            className="w-64 p-4 rounded-lg shadow-md bg-[var(--color-accent2)] border border-[var(--color-secondary)] hover:shadow-xl transition-shadow"
          >
            <div className="mb-2">
              <p className="text-sm font-medium text-[var(--text-dark)]">
                Order #{order.Id} — Status: {order.Status}
              </p>
              <p className="text-lg font-bold text-[var(--text-dark)]">
                {order.UserName}
              </p>
            </div>

            <div className="text-sm text-[var(--text-dark)] space-y-1 mb-2">
              <p>Courier: {order.CourierName || "N/A"}</p>
              <p>Address: {order.Address}</p>
              <p>Notes: {order.Notes || "—"}</p>
              <p>Payment: {order.PaymentMethod}</p>
              <p>Phone: {order.PhoneNumber}</p>
              <p>Total: {order.TotalAmount.toFixed(2)} lei</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Products:</h3>
              <ul className="space-y-1">
                {order.Items.map((item) => (
                  <li
                    key={item.Id}
                    className="text-sm text-[var(--text-dark)] flex justify-between"
                  >
                    <span>
                      {item.ProductName} × {item.Quantity}
                    </span>
                    <span>{item.TotalPrice} lei</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrder;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { Order } from "./Order";
import getEntity from "../../utils/GetEntity";

function MyOrder() {
  const { id } = useParams();
  const endpointUrl = import.meta.env.VITE_ORDERS_ENDPOINT;

  const { data, isLoading, isError, error } = useQuery<Order[] | null>({
    queryKey: ["orders", id],
    queryFn: () => getEntity<Order[]>(`${endpointUrl}orders/${id}`),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!data || data.length === 0)
    return (
      <p className="text-lg md:text-xl font-light text-white">No orders.</p>
    );

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col items-center px-4">
      <h1 className="text-6xl font-extrabold tracking-tight text-[var(--text-light)] drop-shadow-lg mt-8">
        Orders Page
      </h1>

      <ul className="flex flex-wrap justify-center gap-4 mt-8">
        {data.map((order) => (
          <li
            key={order.Id}
            className="w-64 p-4 rounded-lg shadow-sm bg-[var(--color-accent2)] border border-[var(--color-secondary)]"
          >
            <p>Order #{order.Id}</p>
            <p className="text-xl font-semibold text-[var(--text-dark)]">
              Name: {order.UserName}
            </p>
            <p className="text-xl font-semibold text-[var(--text-dark)]">
              Courier: {order.CourierName || "N/A"}
            </p>
            <p className="text-md font-semibold text-[var(--text-dark)]">
              Address: {order.Address}
            </p>
            <p className="text-md font-semibold text-[var(--text-dark)]">
              Notes: {order.Notes || "—"}
            </p>
            <p className="text-md font-semibold text-[var(--text-dark)]">
              Status: {order.Status}
            </p>
            <p className="text-sm font-semibold text-[var(--text-dark)]">
              Payment: {order.PaymentMethod}
            </p>
            <p className="text-sm font-semibold text-[var(--text-dark)]">
              Phone: {order.PhoneNumber}
            </p>
            <p className="text-md font-bold text-[var(--text-light)]">
              Total: {order.TotalAmount.toFixed(2)} lei
            </p>

            <h3 className="mt-2 font-bold">Products:</h3>
            <ul className="space-y-1">
              {order.Items.map((item) => (
                <li
                  key={item.Id}
                  className="text-sm font-semibold text-[var(--text-dark)]"
                >
                  {item.ProductName} — {item.Quantity} × {item.UnitPrice} lei ={" "}
                  {item.TotalPrice} lei
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrder;

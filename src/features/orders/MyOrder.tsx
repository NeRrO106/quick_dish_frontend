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

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Orders Page
        </h1>
      </div>
      <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
        {data?.map((order) => (
          <li
            key={order.Id}
            className="w-64 p-2 border border-gray-200 rounded-lg shadow-sm bg-[var(--color-accent2)] border-[var(--color-secondary)] mb-4"
          >
            <p>Comanda: #{order.Id}</p>
            <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
              {order.UserName}
            </p>
            <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
              {order.CourierName}
            </p>
            <p className="text-md text-center font-semibold text-[var(--text-dakr)] mb-2">
              {order.Address}
            </p>
            <p className="text-md text-center font-semibold text-[var(--text-dark)] mb-2">
              {order.Notes}
            </p>
            <p className="text-md text-center font-semibold text-[var(--text-dark)] mb-2">
              {order.Status}
            </p>
            <p className="text-sm text-center font-semibold text-[var(--text-dark)] mb-2">
              {order.PaymentMethod}
            </p>
            <p className="text-sm text-center font-semibold text-[var(--text-dark)] mb-2">
              {order.PhoneNumber}
            </p>
            <p className="text-md font-bold text-[var(--text-light)] mb-2">
              {order.TotalAmount.toFixed(2)} lei
            </p>
            <h3>Produse: </h3>
            <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4 rtl:space-x-reverse">
              {order.Items.map((item) => (
                <p
                  key={item.Id}
                  className="text-sm text-center font-semibold text-[var(--text-dark)] mb-2"
                >
                  Produs: {item.ProductName} Cantitate: {item.Quantity} *{" "}
                  {item.UnitPrice}lei = {item.TotalPrice}lei
                </p>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {data?.length === 0 && (
        <p className="text-lg md:text-xl font-light text-white">
          No items available in the menu.
        </p>
      )}
    </div>
  );
}
export default MyOrder;

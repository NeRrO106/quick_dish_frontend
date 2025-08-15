import { useQuery } from "@tanstack/react-query";
import getEntity from "../../utils/GetEntity";
import type { Order } from "./Order";
import { useState } from "react";
import putEntity from "../../utils/PutEntity";

function Orders() {
  const endpointUrl = import.meta.env.VITE_ORDERS_ENDPOINT;
  const { data, isLoading, isError, error } = useQuery<Order[] | null>({
    queryKey: ["orders"],
    queryFn: () => getEntity<Order[]>(endpointUrl),
  });

  const statuses = ["Pending", "In Preparation", "Ready", "Taken", "Delivered"];
  const [orderStatus, setOrderStatus] = useState<{ [key: number]: string }>({});

  const handleStatusChange = (orderId: number, status: string) => {
    setOrderStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const handleSaveStatus = async (orderId: number) => {
    const status = orderStatus[orderId];
    await putEntity(`${endpointUrl}${orderId}`, {
      Status: status,
    });
  };

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
              UserName: {order.UserName}
            </p>
            <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
              CourierName: {order.CourierName ?? "N/A"}
            </p>
            <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
              Address: {order.Address}
            </p>
            <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
              Note: {order.Notes}
            </p>
            <select
              value={orderStatus[order.Id] || order.Status}
              onChange={(e) => handleStatusChange(order.Id, e.target.value)}
              className="p-2 rounded mb-2 text-black"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
              Payment Method: {order.PaymentMethod}
            </p>
            <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
              Phone Number: {order.PhoneNumber}
            </p>
            <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
              Total Amount: {order.TotalAmount.toFixed(2)} lei
            </p>
            <h3>Produse: </h3>
            <ul className="text-sm mt-1">
              {order.Items.map((item) => (
                <p className="text-xl text-center font-semibold text-[var(--text-dark)] mb-2">
                  Produs: {item.ProductName} - {item.Quantity} *{" "}
                  {item.UnitPrice} = {item.TotalPrice}
                </p>
              ))}
            </ul>
            <button
              onClick={() => handleSaveStatus(order.Id)}
              className="mt-2 px-4 py-2 bg-[var(--color-accent2)] text-[var(--text-light)] rounded hover:bg-[var(--color-accent3)]"
            >
              Save Status
            </button>
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
export default Orders;

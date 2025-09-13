import { useQuery, useQueryClient } from "@tanstack/react-query";
import getEntity from "../../utils/GetEntity";
import type { Order } from "./Order";
import putEntity from "../../utils/PutEntity";
import { showToast } from "../../utils/ShowToast";
import axios from "axios";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useState } from "react";

function Orders() {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const [deliveryCode, setDeliveryCode] = useState<Record<number, number | "">>(
    {}
  );

  const endpointUrl = import.meta.env.VITE_ORDERS_ENDPOINT;

  const { data, isLoading, isError, error } = useQuery<Order[] | null>({
    queryKey: ["orders", endpointUrl],
    queryFn: () => getEntity<Order[]>(endpointUrl),
  });

  const handleStatusUpdate = async (orderId: number, status: string) => {
    try {
      await putEntity(`${endpointUrl}${orderId}`, { Status: status });
      showToast(`Status updated to "${status}"`, "success");
      queryClient.invalidateQueries({ queryKey: ["orders", endpointUrl] });
    } catch (err) {
      console.error(err);
      showToast("Failed to update order status.", "error");
    }
  };

  const handleTakeOrder = async (orderId: number) => {
    if (!user) return;
    try {
      await putEntity(`${endpointUrl}${orderId}`, {
        Status: "Taken",
        CourierID: user.Id,
      });
      showToast("Order taken!", "success");
      queryClient.invalidateQueries({ queryKey: ["orders", endpointUrl] });
    } catch (err) {
      console.error(err);
      showToast("Failed to take order.", "error");
    }
  };

  const handleDeliverOrder = async (orderId: number) => {
    const code = deliveryCode[orderId];
    if (!code) return showToast("You must enter the code!", "error");

    try {
      await putEntity(`${endpointUrl}${orderId}`, {
        Status: "Delivered",
        Code: code,
      });
      showToast("Order delivered!", "success");
      queryClient.invalidateQueries({ queryKey: ["orders", endpointUrl] });
    } catch (err: unknown) {
      let message = "Failed to mark as delivered!";
      if (axios.isAxiosError(err) && err.response) {
        message = err.response.data || message;
      }
      console.error(err);
      showToast(message, "error");
    }
  };

  const visibleOrders = data?.filter((order) => {
    if (user?.Role === "Courier") {
      return (
        order.Status === "Ready" ||
        (order.Status === "Taken" && order.CourierName === user?.Name)
      );
    }
    return true;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!visibleOrders || visibleOrders.length === 0)
    return (
      <p className="text-lg md:text-xl font-light text-white">
        No orders available
      </p>
    );
  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex flex-col items-center px-4">
      <h1 className="text-6xl font-extrabold tracking-tight text-[var(--text-light)] drop-shadow-lg mt-8">
        Orders
      </h1>

      <ul className="flex flex-wrap justify-center gap-4 mt-8">
        {visibleOrders.map((order) => (
          <li
            key={order.Id}
            className="w-64 p-4 rounded-lg shadow-sm bg-[var(--color-accent2)] border border-[var(--color-secondary)]"
          >
            <p>Order #{order.Id}</p>
            <p className="text-xl font-semibold text-[var(--text-dark)]">
              User: {order.UserName}
            </p>
            <p className="text-xl font-semibold text-[var(--text-dark)]">
              Courier: {order.CourierName ?? "N/A"}
            </p>
            <p className="text-md font-semibold text-[var(--text-dark)]">
              Address: {order.Address}
            </p>
            <p className="text-md font-semibold text-[var(--text-dark)]">
              Notes: {order.Notes || "—"}
            </p>

            {user?.Role === "Manager" ? (
              <>
                <p className="text-md font-semibold text-[var(--text-dark)]">
                  Status: {order.Status}
                </p>

                <div className="flex gap-2 my-2">
                  {(() => {
                    const statusMap: Record<string, string[]> = {
                      Pending: ["In Preparation"],
                      "In Preparation": ["Ready"],
                      Ready: [],
                      Taken: [],
                      Delivered: [],
                    };

                    return statusMap[order.Status]?.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(order.Id, status)}
                        className="px-2 py-1 bg-[var(--color-accent1)] text-[var(--text-dark)] rounded hover:bg-[var(--color-accent3)]"
                      >
                        {status}
                      </button>
                    ));
                  })()}
                </div>
              </>
            ) : (
              <>
                <p className="text-md font-semibold text-[var(--text-dark)]">
                  Status: {order.Status}
                </p>
                {order.Status === "Ready" && (
                  <button
                    onClick={() => handleTakeOrder(order.Id)}
                    className="mt-2 px-4 py-2 bg-[var(--color-accent1)] text-[var(--text-dark)] rounded hover:bg-[var(--color-accent3)]"
                  >
                    Take order
                  </button>
                )}
                {order.Status === "Taken" &&
                  order.CourierName === user?.Name && (
                    <>
                      <input
                        type="number"
                        placeholder="Enter delivery code"
                        value={deliveryCode[order.Id] ?? ""}
                        onChange={(e) =>
                          setDeliveryCode((prev) => ({
                            ...prev,
                            [order.Id]: Number(e.target.value),
                          }))
                        }
                        className="p-2 rounded mb-2 border"
                      />
                      <button
                        onClick={() => handleDeliverOrder(order.Id)}
                        className="mt-2 px-4 py-2 bg-[var(--color-accent1)] text-[var(--text-dark)] rounded hover:bg-[var(--color-accent3)]"
                      >
                        Mark delivered
                      </button>
                    </>
                  )}
              </>
            )}

            <p className="text-sm font-semibold text-[var(--text-dark)]">
              Payment: {order.PaymentMethod}
            </p>
            <p className="text-sm font-semibold text-[var(--text-dark)]">
              Phone: {order.PhoneNumber}
            </p>
            <p className="text-sm font-semibold text-[var(--text-dark)]">
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

export default Orders;

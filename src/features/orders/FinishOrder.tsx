import { useNavigate, useParams } from "react-router-dom";
import getEntity from "../../utils/GetEntity";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "./Order";

function FinishOrder() {
  const { orderId } = useParams();
  const endpointUrl = import.meta.env.VITE_ORDERS_ENDPOINT;
  const { data, isLoading, isError, error } = useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: () => getEntity<Order>(`${endpointUrl}orders/${orderId}`),
  });
  const navigate = useNavigate();
  const handleFinishOrder = () => {
    fetch(`${endpointUrl}orders/finish/${orderId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to finish order");
        }
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Error finishing order: ", error);
      });
  };

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  return (
    <div className="min-h-screen bg-emerald-500 flex items-center justify-center px-4 flex-col">
      <div className="text-center max-w-xl text-white space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Finish Order
        </h1>
        <p className="text-lg md:text-xl font-light">Order ID: {data?.Id}</p>
        <p className="text-lg md:text-xl font-light">
          Total Amount: {data?.TotalAmount.toFixed(2)} lei
        </p>
        <button
          onClick={handleFinishOrder}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          Finish Order
        </button>
      </div>
    </div>
  );
}
export default FinishOrder;

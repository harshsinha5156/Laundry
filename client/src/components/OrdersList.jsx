import { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/orders/customer-orders`, { headers: { Authorization: localStorage.getItem("token") } })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-md mx-auto text-black bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="border-b p-3">
            Service: {order.service} | Vendor: {order.vendorId.name} | Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;

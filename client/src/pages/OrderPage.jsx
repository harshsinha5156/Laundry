import OrderForm from "../components/OrderForm";
import OrdersList from "../components/OrdersList";

const OrderPage = () => {
  return (
    <div className="p-6 h-screen w-screen bg-gray-100">
      <OrderForm />
      <OrdersList />
    </div>
  );
};

export default OrderPage;

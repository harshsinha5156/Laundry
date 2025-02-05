import { useState, useEffect } from "react";
import axios from "axios";

const OrderForm = ({ customerId }) => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [service, setService] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/vendors`)
      .then((res) => setVendors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/orders/create`, 
        { vendorId: selectedVendor, service, pickupDate, instructions }, 
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      alert("Order placed successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md text-black mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Book Laundry Service</h2>
      <form onSubmit={handleSubmit}>
        <label className="block">Select Vendor:</label>
        <select className="w-full border p-2 rounded mb-3" value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
          <option value="">Choose a Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>
              {vendor.name} ({vendor.location})
            </option>
          ))}
        </select>

        <label className="block">Select Service:</label>
        <input className="w-full border p-2 rounded mb-3" type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="Enter Service Type" />

        <label className="block">Pickup Date:</label>
        <input className="w-full border p-2 rounded mb-3" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />

        <label className="block">Special Instructions:</label>
        <textarea className="w-full border p-2 rounded mb-3" value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Any additional instructions"></textarea>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Book Now</button>
      </form>
    </div>
  );
};

export default OrderForm;

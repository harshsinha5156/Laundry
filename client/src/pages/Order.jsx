import { useState } from "react";

const OrderSection = ({ vendors, services }) => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [instructions, setInstructions] = useState("");
  
  const handleSubmit = async () => {
    if (!selectedService || !selectedVendor || !pickupDate) {
      alert("Please fill all required fields");
      return;
    }
    
    const orderData = {
      service: selectedService,
      vendor: selectedVendor,
      pickupDate,
      instructions,
    };
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      
      if (response.ok) {
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error occurred while placing order");
    }
  };
  
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Book a Laundry Service</h2>
      
      <label className="block mb-2">Select Service:</label>
      <select 
        className="w-full p-2 border rounded" 
        value={selectedService} 
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">Choose a service</option>
        {services.map((service, index) => (
          <option key={index} value={service}>{service}</option>
        ))}
      </select>
      
      <label className="block mt-4 mb-2">Select Vendor:</label>
      <select 
        className="w-full p-2 border rounded" 
        value={selectedVendor} 
        onChange={(e) => setSelectedVendor(e.target.value)}
      >
        <option value="">Choose a vendor</option>
        {vendors.map((vendor) => (
          <option key={vendor._id} value={vendor.name}>{vendor.name} - {vendor.location}</option>
        ))}
      </select>
      
      <label className="block mt-4 mb-2">Pickup Date:</label>
      <input 
        type="date" 
        className="w-full p-2 border rounded" 
        value={pickupDate} 
        onChange={(e) => setPickupDate(e.target.value)}
      />
      
      <label className="block mt-4 mb-2">Special Instructions (Optional):</label>
      <textarea 
        className="w-full p-2 border rounded" 
        value={instructions} 
        onChange={(e) => setInstructions(e.target.value)}
      ></textarea>
      
      <button 
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSection;

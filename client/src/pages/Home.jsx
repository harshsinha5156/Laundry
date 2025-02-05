import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [vendors, setVendors] = useState([]);
  const [vendorLocations, setVendorLocations] = useState([]);
  const [vendorServices, setVendorServices] = useState([]);

  // Fetch vendor locations and services
  useEffect(() => {
    axios
      .get("http://localhost:5000/vendors/list")
      .then((response) => {
        const locations = [...new Set(response.data.map((v) => v.location))];
        const services = [...new Set(response.data.flatMap((v) => v.services))];
        setVendorLocations(locations);
        setVendorServices(services);
      })
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  // Fetch user location
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => console.error(err)
      );
    }, []);
    // useEffect(() => {
    //   getCordinates();
    // }, []);

    // const getCordinates = () => {
    //   if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition((response) =>{
    //       console.log(response);
    //     })
    //   }else{
    //     console.log("Geolocation is not supported by this browser.");
    //   }
    // }


  // useEffect(() => {
  //   getLocation();
  // }, []);

  // const getLocation = async () => {
  //   const location = await axios.get("https://ipapi.co./json");
  //   console.log(location.data.latitude);
  //   setLocation({
  //     latitude: location.data.latitude,
  //     longitude: location.data.longitude,
  //   });
  // };

  // Search vendors based on filters
  const searchVendors = async () => {
    const query = `location=${location}&service=${service}`;
    const response = await axios.get(
      `http://localhost:5000/vendors/search?${query}`
    );
    setVendors(response.data);
  };

  // Search vendors based nearby
  const nearByVendors = async () => {
    const response = await axios.get(
      `http://localhost:5000/vendors/nearby?latitude=${location.latitude}&longitude=${location.longitude}`
    );
    if(response.data.length == 0){
      alert("No vendors found near you.");
    }
    setVendors(response.data);
  };


  return (
    <div className="h-screen w-screen bg-gray-100">
      {/* Header */}
      

      {/* Hero Section */}
      <div className="bg-blue-500 text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold">Find the Best Laundry Vendors in Your Area</h2>
      </div>

      {/* Search & Filter Section */}
      <div className="flex justify-center mt-[-60px]">
        <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-3xl">
          <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">Search for Vendors</h3>
          
          {/* Location Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="p-3 border text-gray-950 border-black rounded-full w-full focus:outline-blue-500" onChange={(e) => setLocation(e.target.value)}>
              <option value="" className="text-gray-1000" >Select Location</option>
              {vendorLocations.map((loc, index) => (
                <option key={index} value={loc} className="text-gray-950">{loc}</option>
              ))}
            </select>

            {/* Find Nearby Vendors Button */}
            <button
              onClick={nearByVendors}
              className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition w-full"
            >
              Find Vendors Near Me
            </button>
          </div>

          {/* Service Filter */}
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Select Service</h3>
            <div className="flex flex-wrap gap-4">
              {vendorServices.map((srv, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="service"
                    value={srv}
                    onChange={(e) => setService(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">{srv}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center mt-6">
            <button
              onClick={searchVendors}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full"
            >
              Search Vendors
            </button>
          </div>
        </div>
      </div>

      {/* Display Vendors */}
      <div className="mt-10 px-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Available Vendors</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="bg-white text-black shadow-lg rounded-lg p-4">
              <h4 className="text-xl font-semibold">{vendor.name}</h4>
              <p className="text-gray-600">{vendor.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default Home;

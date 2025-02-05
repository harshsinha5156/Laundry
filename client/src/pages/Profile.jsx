import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return window.location.href = "/auth";
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/profile`, { headers: { Authorization: token } });
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  const addService = async () => {
    if (!newService) return;
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_HOST_URL}/vendors/update-services`, { service: newService }, 
      { headers: { Authorization: localStorage.getItem("token") } });
    setServices(res.data.services);
    setNewService("");
  };

  return (
    <div className="min-h-screen w-screen  bg-gray-100">
    <div className=" flex flex-col pt-28 items-center justify-center ">
      {user ? (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl text-gray-950 font-bold mb-4">Welcome, {user.name}</h2>
          {user.role === "vendor" && (
            <div>
              <h3 className="text-lg text-black font-semibold">Add Services</h3>
              <input type="text" value={newService} onChange={(e) => setNewService(e.target.value)} className="w-full p-2 text-gray-800 border border-black rounded my-2"/>
              <button onClick={addService} className="w-full  bg-green-500 text-white py-2 rounded">Add Service</button>
              <ul className="mt-2">
                {services.map((s, i) => <li key={i} className="border p-2 text-gray-900 rounded mt-1">{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      ) : <p>Loading...</p>}
    </div>
    </div>
  );
}

export default Profile;

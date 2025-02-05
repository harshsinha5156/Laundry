import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Vendors() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (query) {
      axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/vendors/search/location/${query}`)
        .then(res => setVendors(res.data))
        .catch(err => console.error(err));
    }
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Vendors for "{query}"</h1>
      {vendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="p-4 border rounded-lg bg-white shadow-md">
              <h2 className="text-lg font-bold">{vendor.name}</h2>
              <p className="text-gray-600">Location: {vendor.location}</p>
              <p className="text-gray-600">Services: {vendor.services.join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No vendors found.</p>
      )}
    </div>
  );
}

export default Vendors;








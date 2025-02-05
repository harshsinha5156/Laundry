import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // <nav className="bg-blue-500 text-white p-4 flex justify-between">
    //   <h1 className="text-lg font-bold">Laundry Service</h1>
    //   <div>
    //     <Link to="/" className="mr-4">Home</Link>
    //     <Link to="/profile" className="mr-4">Profile</Link>
    //     <Link to="/orders">Orders</Link>
    //   </div>
    // </nav>
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-800">Laundry Service</h1>
    <nav className="space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
         <Link to="/profile" className="text-gray-700 hover:text-blue-500">Profile</Link>
         <Link to="/orders" className="text-gray-700 hover:text-blue-500">Orders</Link>
    </nav>
  </header>
  );
};

export default Navbar;

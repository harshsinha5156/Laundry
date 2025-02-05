import { useState } from "react";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", role: "customer" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? `${import.meta.env.VITE_BACKEND_HOST_URL}/auth/login` : `${import.meta.env.VITE_BACKEND_HOST_URL}/auth/register`;
    try {
      const res = await axios.post(url, formData);
      localStorage.setItem("token", res.data.token);
      alert("Authentication Successful!");
      window.location.href = "/profile";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-black font-bold mb-4 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} className=" text-black space-y-4">
          {!isLogin && (
            <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          )}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded"/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded"/>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-500">
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;

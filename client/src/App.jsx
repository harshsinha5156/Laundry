import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Vendors from './pages/Vendors';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;

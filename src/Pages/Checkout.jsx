import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [details, setDetails] = useState({ name: "", address: "", phone: "", payment: "cod" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  useEffect(() => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/carts?userId=${user.id}`);
        setCart(res.data);
      } catch (err) {
        console.error("Cart Load Error:", err);
        setError("Failed to load cart. Please try again.");
      }
    };

    fetchCart();
  }, [user, navigate]);

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : Number(item.price);
      const qty = typeof item.qty === 'number' ? item.qty : Number(item.qty);
      return sum + (price || 0) * (qty || 0);
    }, 0);
  }, [cart]);

  const formatPrice = (price) => {
    const num = typeof price === 'number' ? price : Number(price);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const placeOrder = async () => {
    if (!details.name || !details.address || !details.phone) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderData = {
        userId: user.id,
        items: cart,
        ...details,
        total: totalAmount,
        status: "pending", // ✅ Set status as 'pending'
        date: new Date().toISOString(),
      };

      await axios.post("http://localhost:3001/orders", orderData);

      await Promise.all(
        cart.map((item) =>
          axios.delete(`http://localhost:3001/carts/${item.id}`)
        )
      );

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order Error:", err);
      setError("Could not place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#fef6f3] flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-[#6f4e37] mb-4">Error</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#6f4e37] text-white px-4 py-2 rounded hover:bg-[#5a3f2d]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef6f3] py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-10">Checkout 🛒</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#6f4e37] mb-4">Shipping Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={details.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6f4e37] focus:border-[#6f4e37]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
              <textarea
                name="address"
                placeholder="Enter address here"
                value={details.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6f4e37] focus:border-[#6f4e37]"
                rows="3"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter mobile number"
                value={details.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6f4e37] focus:border-[#6f4e37]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                name="payment"
                value={details.payment}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6f4e37] focus:border-[#6f4e37]"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>
          </div>
          <button
            onClick={placeOrder}
            disabled={loading}
            className={`mt-6 bg-[#6f4e37] text-white w-full py-3 rounded-md hover:bg-[#5a3f2d] transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#6f4e37] mb-4">Order Summary</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-4 mb-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="font-semibold">₹{formatPrice(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total:</span>
                  <span>₹{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

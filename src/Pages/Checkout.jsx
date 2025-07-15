import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "cod",
  });

  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  useEffect(() => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:3001/carts?userId=${user.id}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Cart Load Error:", err));
  }, [user, navigate]);

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!details.name || !details.address || !details.phone) {
      alert("Please fill in all shipping details.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/orders", {
        userId: user.id,
        items: cart,
        ...details,
        total: totalAmount,
        status: "Processing",
        date: new Date().toISOString(),
      });

      // Clear cart
      for (const item of cart) {
        await axios.delete(`http://localhost:3001/carts/${item.id}`);
      }

      alert("Order placed successfully!");
      navigate("/"); // Redirect after placing order
    } catch (err) {
      console.error("Order Error:", err);
      alert("Could not place order.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fef6f3] py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-10">
        Checkout 🛒
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#6f4e37] mb-4">
            Shipping Details
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={details.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6f4e37]"
          />

          <textarea
            name="address"
            placeholder="Shipping Address"
            value={details.address}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6f4e37]"
          ></textarea>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={details.phone}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6f4e37]"
          />

          <label className="block font-medium text-[#6f4e37] mb-2">
            Payment Method
          </label>
          <select
            name="payment"
            value={details.payment}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6f4e37]"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
          </select>

          <button
            onClick={placeOrder}
            className="bg-[#6f4e37] text-white w-full py-3 rounded-md hover:bg-[#5a3f2d] transition"
          >
            Place Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#6f4e37] mb-4">
            Order Summary
          </h3>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <span className="font-semibold">₹{item.price * item.qty}</span>
                </li>
              ))}
            </ul>
          )}

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/");
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    const res = await axios.get(`http://localhost:3001/carts?userId=${user.id}`);
    setCart(res.data);
  };

  const updateQty = async (id, newQty) => {
    if (newQty < 1) return;
    await axios.patch(`http://localhost:3001/carts/${id}`, { qty: newQty });
    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:3001/carts/${id}`);
    fetchCart();
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center gap-4"
          >
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-700">{item.name}</h4>
              <p className="text-gray-600">
                ₹{item.price} x {item.qty} = <span className="font-semibold">₹{item.price * item.qty}</span>
              </p>

              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>
                <span className="mx-4">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="mt-3 text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold mb-4">Total: ₹{getTotal()}</h3>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
 
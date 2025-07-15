import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("user"));
  }, []);

  useEffect(() => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:3001/wishlist?userId=${user.id}`)
      .then((res) => setWishlist(res.data))
      .catch((err) => {
        console.error("Wishlist Load Error:", err);
        alert("Could not load wishlist.");
      });
  }, [user, navigate]);

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Remove Error:", err);
      alert("Failed to remove item.");
    }
  };

  const moveToCart = async (item) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/carts?userId=${user.id}&productId=${item.productId}`
      );

      const exists = res.data.length > 0;

      if (!exists) {
        await axios.post("http://localhost:3001/carts", {
          userId: user.id,
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: 1,
        });

        alert("Item added to cart (also remains in wishlist)");
      } else {
        alert("Item already in cart");
      }
    } catch (err) {
      console.error("Move to Cart Error:", err);
      alert("Could not move item to cart.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fef6f3] py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-10">
        Your Wishlist 💝
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Your wishlist is empty. Start adding your favorites!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain bg-white p-2"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-semibold text-[#6f4e37]">{item.name}</h3>
                  <p className="text-[#6f4e37] font-medium mt-2 mb-4">₹{item.price}</p>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => moveToCart(item)}
                  >
                    Move to Cart
                  </button>
                  <button
                    className="w-full bg-[#6f4e37] text-white py-2 rounded hover:bg-[#5a3f2d] transition"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

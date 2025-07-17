// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useUser } from "../Context/UserContext";
// // import axios from "axios";

// // function Cart() {
// //   const { user, cart, fetchCart, setCart } = useUser();
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     if (!user) {
// //       alert("Please login first");
// //       navigate("/login");
// //       return;
// //     }

// //     const loadCart = async () => {
// //       try {
// //         setLoading(true);
// //         await fetchCart();
// //       } catch (err) {
// //         setError("Failed to load cart. Please try again.");
// //         console.error("Cart error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadCart();
// //   }, [user, fetchCart, navigate]);

// //   const updateQty = async (id, newQty) => {
// //     if (newQty < 1) return;
    
// //     try {
// //       await axios.patch(`http://localhost:3001/carts/${id}`, { qty: newQty });
// //       await fetchCart();
// //     } catch (err) {
// //       console.error("Update quantity error:", err);
// //       alert("Failed to update quantity");
// //     }
// //   };

// //   const removeItem = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:3001/carts/${id}`);
// //       await fetchCart();
// //     } catch (err) {
// //       console.error("Remove item error:", err);
// //       alert("Failed to remove item");
// //     }
// //   };

// //   const getTotal = () => {
// //     return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="bg-[#fef6f3] min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f4e37] mx-auto"></div>
// //           <p className="mt-4 text-[#6f4e37]">Loading your cart...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="bg-[#fef6f3] min-h-screen flex items-center justify-center">
// //         <div className="text-center p-6 bg-white rounded-lg shadow-md">
// //           <p className="text-red-500 mb-4">{error}</p>
// //           <button 
// //             onClick={() => window.location.reload()} 
// //             className="bg-[#6f4e37] text-white px-4 py-2 rounded hover:bg-[#5a3d2a]"
// //           >
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-[#fef6f3] min-h-screen p-6">
// //       <h2 className="text-center text-4xl font-bold text-[#6f4e37] mb-2 font-serif">
// //         Your Cart 🛒
// //       </h2>

// //       {cart.length === 0 ? (
// //         <div className="text-center mt-8">
// //           <p className="text-gray-500 text-lg mb-4">Your cart is currently empty.</p>
// //           <button
// //             onClick={() => navigate("/products")}
// //             className="bg-[#6f4e37] hover:bg-[#5a3d2a] text-white px-6 py-2 rounded-lg transition"
// //           >
// //             Browse Products
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2 space-y-6">
// //             {cart.map((item) => (
// //               <div
// //                 key={item.id}
// //                 className="bg-white rounded-2xl shadow-md flex flex-col sm:flex-row p-4 gap-6 hover:shadow-lg transition"
// //               >
// //                 <img
// //                   src={item.image}
// //                   alt={item.name}
// //                   className="w-32 h-32 object-contain bg-white rounded-md"
// //                 />
// //                 <div className="flex flex-col justify-between flex-1">
// //                   <div>
// //                     <h4 className="text-xl font-semibold text-[#6f4e37]">{item.name}</h4>
// //                     <p className="text-gray-600 text-sm mt-1">
// //                       ₹{item.price.toFixed(2)} × {item.qty}
// //                       <span className="ml-2 font-semibold text-black">
// //                         = ₹{(item.price * item.qty).toFixed(2)}
// //                       </span>
// //                     </p>
// //                   </div>

// //                   <div className="flex items-center mt-3 space-x-3">
// //                     <button
// //                       onClick={() => updateQty(item.id, item.qty - 1)}
// //                       className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition"
// //                       disabled={item.qty <= 1}
// //                     >
// //                       -
// //                     </button>
// //                     <span className="text-lg font-medium">{item.qty}</span>
// //                     <button
// //                       onClick={() => updateQty(item.id, item.qty + 1)}
// //                       className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition"
// //                     >
// //                       +
// //                     </button>
// //                     <button
// //                       onClick={() => removeItem(item.id)}
// //                       className="ml-auto text-red-500 hover:text-red-600 text-sm transition"
// //                     >
// //                       Remove
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
// //             <h3 className="text-2xl font-bold text-[#6f4e37] mb-4">Order Summary</h3>
// //             <div className="flex justify-between text-gray-700 mb-2">
// //               <span>Subtotal ({cart.length} items)</span>
// //               <span>₹{getTotal().toFixed(2)}</span>
// //             </div>
// //             <div className="flex justify-between text-gray-500 text-sm mb-6">
// //               <span>Shipping</span>
// //               <span>Free</span>
// //             </div>
// //             <hr className="mb-4" />
// //             <div className="flex justify-between text-lg font-bold text-black mb-6">
// //               <span>Total</span>
// //               <span>₹{getTotal().toFixed(2)}</span>
// //             </div>
// //             <button
// //               onClick={() => navigate("/checkout")}
// //               className="w-full bg-[#6f4e37] hover:bg-[#5a3d2a] text-white py-3 rounded-lg transition font-medium"
// //             >
// //               Proceed to Checkout
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Cart;






// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../Context/UserContext";
// import axios from "axios";

// function Cart() {
//   const { user, cart, fetchCart } = useUser();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!user) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }

//     const loadCart = async () => {
//       try {
//         setLoading(true);
//         await fetchCart();
//       } catch (err) {
//         setError("Failed to load cart. Please try again.");
//         console.error("Cart error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCart();
//   }, [user, fetchCart, navigate]);

//   const updateQty = async (id, newQty) => {
//     if (newQty < 1) return;
    
//     try {
//       await axios.patch(`http://localhost:3001/carts/${id}`, { qty: newQty });
//       await fetchCart();
//     } catch (err) {
//       console.error("Update quantity error:", err);
//       alert("Failed to update quantity");
//     }
//   };

//   const removeItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/carts/${id}`);
//       await fetchCart();
//     } catch (err) {
//       console.error("Remove item error:", err);
//       alert("Failed to remove item");
//     }
//   };

//   //Safely calculate total with number conversion
//   const getTotal = () => {
//     return cart.reduce((sum, item) => {
//       const price = typeof item.price === 'number' ? item.price : Number(item.price);
//       const qty = typeof item.qty === 'number' ? item.qty : Number(item.qty);
//       return sum + (price || 0) * (qty || 0);
//     }, 0);
//   };

//   // Format price safely
//   const formatPrice = (price) => {
//     const num = typeof price === 'number' ? price : Number(price);
//     return isNaN(num) ? '0.00' : num.toFixed(2);
//   };

//   if (loading) {
//     return (
//       <div className="bg-[#fef6f3] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f4e37] mx-auto"></div>
//           <p className="mt-4 text-[#6f4e37]">Loading your cart...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-[#fef6f3] min-h-screen flex items-center justify-center">
//         <div className="text-center p-6 bg-white rounded-lg shadow-md">
//           <p className="text-red-500 mb-4">{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="bg-[#6f4e37] text-white px-4 py-2 rounded hover:bg-[#5a3d2a]"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#fef6f3] min-h-screen p-6">
//       <h2 className="text-center text-4xl font-bold text-[#6f4e37] mb-2 font-serif">
//         Your Cart 🛒
//       </h2>

//       {cart.length === 0 ? (
//         <div className="text-center mt-8">
//           <p className="text-gray-500 text-lg mb-4">Your cart is currently empty.</p>
//           <button
//             onClick={() => navigate("/products")}
//             className="bg-[#6f4e37] hover:bg-[#5a3d2a] text-white px-6 py-2 rounded-lg transition"
//           >
//             Browse Products
//           </button>
//         </div>
//       ) : (
//         <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-2xl shadow-md flex flex-col sm:flex-row p-4 gap-6 hover:shadow-lg transition"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-32 h-32 object-contain bg-white rounded-md"
//                 />
//                 <div className="flex flex-col justify-between flex-1">
//                   <div>
//                     <h4 className="text-xl font-semibold text-[#6f4e37]">{item.name}</h4>
//                     <p className="text-gray-600 text-sm mt-1">
//                       ₹{formatPrice(item.price)} × {item.qty}
//                       <span className="ml-2 font-semibold text-black">
//                         = ₹{formatPrice(item.price * item.qty)}
//                       </span>
//                     </p>
//                   </div>

//                   <div className="flex items-center mt-3 space-x-3">
//                     <button
//                       onClick={() => updateQty(item.id, item.qty - 1)}
//                       className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition"
//                       disabled={item.qty <= 1}
//                     >
//                       -
//                     </button>
//                     <span className="text-lg font-medium">{item.qty}</span>
//                     <button
//                       onClick={() => updateQty(item.id, item.qty + 1)}
//                       className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition"
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="ml-auto text-red-500 hover:text-red-600 text-sm transition"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
//             <h3 className="text-2xl font-bold text-[#6f4e37] mb-4">Order Summary</h3>
//             <div className="flex justify-between text-gray-700 mb-2">
//               <span>Subtotal ({cart.length} items)</span>
//               <span>₹{formatPrice(getTotal())}</span>
//             </div>
//             <div className="flex justify-between text-gray-500 text-sm mb-6">
//               <span>Shipping</span>
//               <span>Free</span>
//             </div>
//             <hr className="mb-4" />
//             <div className="flex justify-between text-lg font-bold text-black mb-6">
//               <span>Total</span>
//               <span>₹{formatPrice(getTotal())}</span>
//             </div>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="w-full bg-[#6f4e37] hover:bg-[#5a3d2a] text-white py-3 rounded-lg transition font-medium"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import axios from "axios";

function Cart() {
  const { user, cart, fetchCart } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track item IDs currently being updated or deleted
  const [updatingItemIds, setUpdatingItemIds] = useState([]);

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const loadCart = async () => {
      try {
        setLoading(true);
        await fetchCart();
      } catch (err) {
        setError("Failed to load cart. Please try again.");
        console.error("Cart error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user, fetchCart, navigate]);

  const startUpdating = (id) => setUpdatingItemIds((ids) => [...ids, id]);
  const stopUpdating = (id) =>
    setUpdatingItemIds((ids) => ids.filter((itemId) => itemId !== id));

  const updateQty = async (id, newQty) => {
    if (newQty < 1) return;

    startUpdating(id);

    try {
      await axios.patch(`http://localhost:3001/carts/${id}`, { qty: newQty });
      await fetchCart();
    } catch (err) {
      console.error("Update quantity error:", err);
      alert("Failed to update quantity");
    } finally {
      stopUpdating(id);
    }
  };

  const removeItem = async (id) => {
    startUpdating(id);

    try {
      await axios.delete(`http://localhost:3001/carts/${id}`);
      await fetchCart();
    } catch (err) {
      console.error("Remove item error:", err);
      alert("Failed to remove item");
    } finally {
      stopUpdating(id);
    }
  };

  // Safely calculate total with number conversion
  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = typeof item.price === "number" ? item.price : Number(item.price);
      const qty = typeof item.qty === "number" ? item.qty : Number(item.qty);
      return sum + (price || 0) * (qty || 0);
    }, 0);
  };

  // Format price safely
  const formatPrice = (price) => {
    const num = typeof price === "number" ? price : Number(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  if (loading) {
    return (
      <div className="bg-[#fef6f3] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f4e37] mx-auto"></div>
          <p className="mt-4 text-[#6f4e37]">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fef6f3] min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#6f4e37] text-white px-4 py-2 rounded hover:bg-[#5a3d2a]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fef6f3] min-h-screen p-6">
      <h2 className="text-center text-4xl font-bold text-[#6f4e37] mb-2 font-serif">
        Your Cart 🛒
      </h2>

      {cart.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-lg mb-4">Your cart is currently empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#6f4e37] hover:bg-[#5a3d2a] text-white px-6 py-2 rounded-lg transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {
              const isUpdating = updatingItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md flex flex-col sm:flex-row p-4 gap-6 hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-contain bg-white rounded-md"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-xl font-semibold text-[#6f4e37]">{item.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        ₹{formatPrice(item.price)} × {item.qty}
                        <span className="ml-2 font-semibold text-black">
                          = ₹{formatPrice(item.price * item.qty)}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center mt-3 space-x-3">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.qty <= 1 || isUpdating}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isUpdating}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-500 hover:text-red-600 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isUpdating}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
            <h3 className="text-2xl font-bold text-[#6f4e37] mb-4">Order Summary</h3>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm mb-6">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between text-lg font-bold text-black mb-6">
              <span>Total</span>
              <span>₹{formatPrice(getTotal())}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#6f4e37] hover:bg-[#5a3d2a] text-white py-3 rounded-lg transition font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

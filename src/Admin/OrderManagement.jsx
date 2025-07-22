// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [activeTab, setActiveTab] = useState("products");

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:3001/products");
//       setProducts(res.data);
//     } catch (error) {
//       toast.error("Failed to fetch products");
//     }
//   };

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:3001/orders");
//       setOrders(res.data.reverse());
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     }
//   };

//   // Delete a product
//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Are you sure to delete this product?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/products/${id}`);
//       setProducts(products.filter((item) => item.id !== id));
//       toast.success("Product deleted!");
//     } catch (error) {
//       toast.error("Error deleting product.");
//     }
//   };

//   // Delete an order
//   const handleDeleteOrder = async (id) => {
//     if (!window.confirm("Are you sure to delete this order?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/orders/${id}`);
//       setOrders(orders.filter((order) => order.id !== id));
//       toast.success("Order deleted!");
//     } catch (error) {
//       toast.error("Error deleting order.");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard ⚙️</h2>

//       <div className="flex gap-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded ${activeTab === "products" ? "bg-[#6f4e37] text-white" : "bg-gray-200"}`}
//           onClick={() => setActiveTab("products")}
//         >
//           Products
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-[#6f4e37] text-white" : "bg-gray-200"}`}
//           onClick={() => setActiveTab("orders")}
//         >
//           Orders
//         </button>
//       </div>

//       {activeTab === "products" && (
//         <div>
//           {products.length === 0 ? (
//             <p>No products found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.map(product => (
//                 <div key={product.id} className="bg-white border shadow p-4 rounded">
//                   <img src={product.image} alt={product.name} className="h-40 w-full object-contain mb-4" />
//                   <h3 className="text-lg font-semibold">{product.name}</h3>
//                   <p className="text-sm text-gray-600 mb-2">₹{product.price}</p>
//                   <div className="flex justify-between items-center">
//                     <button
//                       onClick={() => handleDeleteProduct(product.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => toast("Edit functionality pending")}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === "orders" && (
//         <div>
//           {orders.length === 0 ? (
//             <p>No orders found.</p>
//           ) : (
//             <div className="space-y-6">
//               {orders.map((order) => (
//                 <div key={order.id} className="bg-white p-4 shadow rounded border">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="text-lg font-semibold text-[#6f4e37]">Order #{order.id}</h4>
//                       <p className="text-sm text-gray-600">Status: {order.status}</p>
//                       <p className="text-sm text-gray-600">Payment: {order.payment}</p>
//                       <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleString()}</p>
//                     </div>
//                     <button
//                       onClick={() => handleDeleteOrder(order.id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete Order
//                     </button>
//                   </div>

//                   <div className="mt-4">
//                     {order.items.map((item, index) => (
//                       <div key={index} className="flex items-center gap-4 border-b py-2">
//                         <img src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
//                         <div className="flex-1">
//                           <p className="text-sm font-medium">{item.name}</p>
//                           <p className="text-xs text-gray-500">₹{item.price} × {item.qty}</p>
//                         </div>
//                         <p className="font-semibold">₹{item.price * item.qty}</p>
//                       </div>
//                     ))}
//                     <div className="flex justify-between mt-2 text-sm text-gray-700">
//                       <span>Shipping Address:</span>
//                       <span>{order.address.substring(0, 40)}...</span>
//                     </div>
//                     <div className="text-right font-bold text-[#6f4e37] mt-1">
//                       Total: ₹{order.total.toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductManagement;


import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [editingOrder, setEditingOrder] = useState(null);
  const [editValues, setEditValues] = useState({ status: "", payment: "" });



  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/orders");
      setOrders(res.data.reverse());
    } catch (err) {
      console.error(err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    if (paymentFilter !== "all") {
      filtered = filtered.filter((order) => order.payment === paymentFilter);
    }
    setFilteredOrders(filtered);
  };


  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`http://localhost:3001/orders/${id}`);
      toast.success("Order deleted!");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to delete order.");
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setEditValues({ status: order.status, payment: order.payment });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedOrder = { ...editingOrder, ...editValues };
      await axios.put(`http://localhost:3001/orders/${editingOrder.id}`, updatedOrder);
      toast.success("Order updated!");
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update order.");
    }
  };

  const handleCancelEdit = () => setEditingOrder(null);

  const formatPrice = (price) => {
    const num = typeof price === "number" ? price : Number(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, paymentFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#2e1a1a]">
        <div className="text-center text-amber-300">
          <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-amber-300 mx-auto mb-4"></div>
          <p>Loading Orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef3e7] via-[#f9e0c7] to-[#fbe4d5] p-6 text-white font-sans">
      <h2 className="text-4xl font-bold mb-6 text-[#5c2c06]">🍫 Manage Orders</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-[#5c2c06] mb-1">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded bg-white text-[#4b2e2e] font-medium shadow-md"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-[#5c2c06] mb-1">Filter by Payment</label>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="p-2 rounded bg-white text-[#4b2e2e] font-medium shadow-md"
          >
            <option value="all">All</option>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-300">No orders match the selected filters.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white text-[#3d2b1f] border border-amber-200 rounded-2xl shadow-2xl p-6 transition hover:scale-[1.01] duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">User ID: {order.userId}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase
                      ${order.status === "pending" && "bg-yellow-100 text-yellow-700"}
                      ${order.status === "shipped" && "bg-blue-100 text-blue-700"}
                      ${order.status === "delivered" && "bg-green-100 text-green-700"}
                      ${order.status === "cancelled" && "bg-red-100 text-red-700"}`}>
                      {order.status}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase
                      ${order.payment === "cod" ? "bg-purple-100 text-purple-700" : "bg-pink-100 text-pink-700"}`}>
                      {order.payment}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Date: {new Date(order.date).toLocaleString()}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditClick(order)}
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#4b2e2e] font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3"
                  >
                    
                    {/* <img
                      src={item.image}
                      alt={item.name}
                      className="w-15 h-15 object-cover rounded"
                    /> */}
                     <img
                        src={`/${item.image}`}
                        alt={item.name}
                        className="w-15 h-15 object-cover rounded"
               
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ₹{formatPrice(item.price)} × {item.qty}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <strong>Shipping Address:</strong> {order.address.substring(0, 60)}...
              </div>
              <div className="mt-2 text-right text-lg font-bold text-[#4b2e2e]">
                Total: ₹{formatPrice(order.total)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] max-w-md p-6 rounded-2xl shadow-2xl border border-amber-300 animate-fadeIn">
            <h3 className="text-xl font-bold text-[#4b2e2e] mb-4">
              Edit Order #{editingOrder.id}
            </h3>

            <label className="block mb-4 text-sm text-[#3d2b1f]">
              Status:
              <select
                value={editValues.status}
                onChange={(e) =>
                  setEditValues({ ...editValues, status: e.target.value })
                }
                className="block w-full mt-1 p-2 border rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>

            <label className="block mb-6 text-sm text-[#3d2b1f]">
              Payment:
              <select
                value={editValues.payment}
                onChange={(e) =>
                  setEditValues({ ...editValues, payment: e.target.value })
                }
                className="block w-full mt-1 p-2 border rounded-md"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="online">Online</option>
              </select>
            </label>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded bg-[#4b2e2e] hover:bg-[#3d2b1f] text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

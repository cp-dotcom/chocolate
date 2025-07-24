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

  // 🔁 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

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

  // 🧮 Pagination calculation
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
    setCurrentPage(1); // reset to page 1 on filter change
  }, [orders, statusFilter, paymentFilter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
    <div className="min-h-screen bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-white font-sans">
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

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-400">No orders match the selected filters.</p>
      ) : (
        <div className="space-y-6">
          {currentOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white text-[#3d2b1f] border border-[#00000] rounded-2xl shadow-2xl p-6 transition hover:scale-[1.01] duration-300"
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
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#4b2e2e] font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                currentPage === idx + 1
                  ? "bg-[#4b2e2e] text-white shadow-lg"
                  : "bg-white text-[#4b2e2e] border border-[#4b2e2e] hover:bg-[#f3ebe7]"
              }`}
            >
              {idx + 1}
            </button>
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

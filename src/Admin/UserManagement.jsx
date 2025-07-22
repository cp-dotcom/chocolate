import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3001/users");
    setUsers(res.data.reverse()); // Newest first
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleDetails = (userId) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  const deleteUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  // Build readable name
  const getDisplayName = (user) => user.name || user.username || user.email;

  const allUserNames = users.map(getDisplayName).join(", ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff4e6] to-[#fbe4d5] p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#5c2c06] mb-6 text-center">👥 User Management</h2>

        {/* Input field showing all user names */}
        <div className="mb-6">
          <label className="block text-[#5c2c06] font-medium mb-2">All User Names:</label>
          <input
            type="text"
            value={allUserNames}
            readOnly
            className="w-full p-2 border border-[#d4bfa5] rounded bg-white shadow-sm text-[#5c2c06]"
          />
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="mb-4 bg-white shadow-lg rounded-lg p-4 border border-[#dec6b0] hover:shadow-xl transition duration-200"
          >
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDetails(user.id)}>
              <div>
                <h3 className="text-lg font-semibold text-[#4b2e2e]">
                  {getDisplayName(user)}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {user.role === "admin" ? "Admin" : "User"}
                  </span>
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <span className="text-sm text-gray-600">
                {expandedUserId === user.id ? "▲ Hide" : "▼ View"}
              </span>
            </div>

            {expandedUserId === user.id && (
              <div className="mt-4 text-sm text-[#5c2c06] space-y-1">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username || "N/A"}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p><strong>Role:</strong> {user.role || "User"}</p>
                <p><strong>Address:</strong> {user.address || "Not Provided"}</p>

                <button
                  className="mt-3 flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs"
                  onClick={() => deleteUser(user.id)}
                >
                  <FaTrash size={14} /> Delete User
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;

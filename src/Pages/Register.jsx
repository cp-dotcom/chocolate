import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {
 const [user, setUser] = useState({ username: "", email: "", password: "", role: "user" });

  const navigate = useNavigate();

  const setRegister = async (form) => {
    if (!form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3001/users?email=${encodeURIComponent(form.email)}`);
      if (res.data.length > 0) {
        alert("Email already registered!");
      } else {
        await axios.post("http://localhost:3001/users", { ...form });
        alert("Registered successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fef6f3]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-6">Create Account</h2>
        
      
        <div className="space-y-4">

          <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />


          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          {/* <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> */}

          <button
            onClick={() => setRegister(user)}
            className="w-full bg-[#6f4e37] text-white py-2 rounded-md hover:bg-[#5a3f2d] transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register

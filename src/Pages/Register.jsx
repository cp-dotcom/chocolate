import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {
  const [user, setUser] = useState({ email: "", password: "", role: "user" });
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
    <>
      <h1>Registration</h1>
      <input
        type="text"
        placeholder='Enter your email'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder='Enter your password'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <select onChange={(e) => setUser({ ...user, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={() => setRegister(user)}>Register</button>
    </>
  )
}

export default Register

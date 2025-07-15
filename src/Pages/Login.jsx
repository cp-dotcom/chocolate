import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const change = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const Log = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${login.email}&password=${login.password}`
      );

      if (res.data.length > 0) {
        const user = res.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please check the console.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fef6f3]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-6">Welcome Back</h2>

        <form onSubmit={Log} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={change}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={change}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#6f4e37] text-white py-2 rounded-md hover:bg-[#5a3f2d] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

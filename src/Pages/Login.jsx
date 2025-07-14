import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const change = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const Log = async () => {
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
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>
        <div className="mb-4">
          <input
            name="email"
            placeholder="Email"
            onChange={change}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={change}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={Log}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

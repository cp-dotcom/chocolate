import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials!..pls register first");
      navigate('/Register')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fef6f3]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          <button type="submit" className="w-full bg-[#6f4e37] text-white py-2 rounded-md hover:bg-[#5a3f2d]">Login</button>
         
        </form>
      </div>
    </div>
  );
}

export default Login;

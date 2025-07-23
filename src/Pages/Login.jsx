import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useUser();
  const [allUsers, setAllUsers] = useState([]);  // All users fetched from server

// Fetch users once on component mount
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      setAllUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };
  
  fetchUsers();
}, []);






  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(loginData.email)) newErrors.email = "Invalid email format";

    if (!loginData.password) newErrors.password = "Password is required";
    else if (loginData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };






const handleLogin = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  
  const { email, password } = loginData; 

  const matchedUser = allUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (matchedUser) {
    toast.success("Login successful!");
    // Store user in localStorage or context
    localStorage.setItem("user", JSON.stringify(matchedUser));
    if (matchedUser.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/"); // or homepage
    }
  } else {
    toast.error("Invalid credentials! Please register first.");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fef6f3]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#6f4e37] text-white py-2 rounded-md hover:bg-[#5a3f2d]"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full text-blue-900 py-2 rounded-md"
            onClick={() => navigate("/Register")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

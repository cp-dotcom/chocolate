// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, AreaChart, Area
// } from 'recharts';
// import { toast } from 'react-hot-toast';

// const COLORS = ['#5c2c06','#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

// const AdminDashboard = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [timeframe, setTimeframe] = useState('30d');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [ordersRes, usersRes, productsRes] = await Promise.all([
//           axios.get('http://localhost:3001/orders'),
//           axios.get('http://localhost:3001/users'),
//           axios.get('http://localhost:3001/products')
//         ]);
//         const orders = ordersRes.data || [];
//         const users = usersRes.data || [];
//         const products = productsRes.data || [];

//         const dataByDate = {};
//         const categoryCount = {};
//         let total = 0;

//         orders.forEach(order => {
//           const date = new Date(order.date || Date.now()).toLocaleDateString();
//           const amount = order.totalAmount || 0;
//           dataByDate[date] = (dataByDate[date] || 0) + amount;
//           total += amount;
//           (order.items || []).forEach(item => {
//             const cat = item.category || 'Other';
//             categoryCount[cat] = (categoryCount[cat] || 0) + (item.quantity || 1);
//           });
//         });

//         const recent = orders.slice(-5).reverse().map(o => ({
//           id: o.id,
//           customer: o.user?.name || 'Anonymous',
//           product: o.items?.[0]?.name || 'N/A',
//           amount: `₹${o.totalAmount || 0}`,
//           status: o.status || 'Pending',
//           date: new Date(o.date).toLocaleDateString()
//         }));

//         setSalesData(Object.entries(dataByDate).map(([date, revenue]) => ({ date, revenue })));
//         setCategoryData(Object.entries(categoryCount).map(([name, value]) => ({
//           name: name.charAt(0).toUpperCase() + name.slice(1),
//           value
//         })));
//         setTotalRevenue(total);
//         setOrders(orders);
//         setUsers(users);
//         setProducts(products);
//         setRecentOrders(recent);
//       } catch (e) {
//         console.error(e);
//         toast.error('Failed to load dashboard data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [timeframe]);

//   const stats = [
//     { title: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-gradient-to-tr from-yellow-400 to-amber-600' },
//     { title: 'Orders', value: orders.length, icon: '🛒', color: 'bg-gradient-to-tr from-pink-400 to-red-600' },
//     { title: 'Users', value: users.length, icon: '👥', color: 'bg-gradient-to-tr from-purple-400 to-indigo-600' },
//     { title: 'Products', value: products.length, icon: '📦', color: 'bg-gradient-to-tr from-green-400 to-emerald-600' }
//   ];

//   if (loading) return (
//     <div className="min-h-[80vh] flex items-center justify-center">
//       <div className="animate-spin h-12 w-12 border-4 border-t-amber-400 rounded-full"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white p-6 text-white">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-[#5c2c06] mb-4 lg:mb-0 ml-37">
//          🍫 ChocoLuxe Dashboard</h1>
         
//         <select value={timeframe} onChange={e => setTimeframe(e.target.value)}
//           className="px-4 py-2 rounded-md bg-gray-100 border border-gray-600 text-black">
//           <option value="7d">Last 7 days</option>
//           <option value="30d">Last 30 days</option>
//           <option value="90d">Last 90 days</option>
//         </select>
//       </div>
//        <br>
//           </br>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((s, i) => (
//           <div key={i} className={`p-6 rounded-xl backdrop-blur-md ${s.color} bg-opacity-20`}>
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-3xl">{s.icon}</span>
//               <span className="text-2xl font-bold">{s.value}</span>
//             </div>
//             <p className="uppercase text-sm tracking-wide">{s.title}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid lg:grid-cols-3 gap-6 mb-8">
//         <div className="lg:col-span-2 p-6 bg-gray-100 text-green-400 rounded-xl">
//           <h3 className="text-xl mb-4">Revenue Over Time</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <AreaChart data={salesData}>
//               <defs>
//                 <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#FFD54F" stopOpacity={0.6}/>
//                   <stop offset="95%" stopColor="#FFD54F" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid stroke="#333" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip contentStyle={{ backgroundColor: '#2a2a3d' }}/>
//               <Area dataKey="revenue" stroke="#FFD54F" fill="url(#revGrad)" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="p-6 bg-gray-100 rounded-xl">
//           <h3 className="text-xl mb-4 text-black">Product Categories</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart >
//               <Pie  data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
//                 {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//               </Pie>
//               <Tooltip contentStyle={{ backgroundColor: '#ffff' }}/>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Orders */}
//      <div className="p-6 bg-gray-100 rounded-2xl shadow-lg overflow-x-auto border ">
//   <h3 className="text-2xl font-bold text-center mb-6 text-[#5c2c06] tracking-wider">
//      Recent Orders
//   </h3>
//   <table className="min-w-full text-sm text-left ">
//     <thead>
//       <tr className="bg-gray-800 text-white border-1 border-solid  ">
//         {['ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
//           <th key={h} className="py-3 px-4 uppercase tracking-wider font-semibold">{h}</th>
//         ))}
//       </tr>
//     </thead>
//     <tbody  >
//       {recentOrders.length ? recentOrders.map((o, idx) => (
//         <tr key={o.id} className={`bg-gray-200 text-black hover:bg-gray-600 hover:text-white transition-all duration-200 `}>
//           <td className="py-3 px-4">{o.id}</td>
//           <td className="py-3 px-4">{o.customer}</td>
//           <td className="py-3 px-4">{o.product}</td>
//           <td className="py-3 px-4">{o.amount}</td>
//           <td className="py-3 px-4">
//             <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
//               o.status === 'Completed' ? 'bg-green-600' :
//               o.status === 'Processing' ? 'bg-blue-500' : 'bg-yellow-500'
//             }`}>
//               {o.status}
//             </span>
//           </td>
//           <td className="py-3 px-4">{o.date}</td>
//         </tr>
//       )) : (
//         <tr>
//           <td colSpan="6" className="py-6 text-center text-gray-400">No orders</td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>

//     </div>
//   );
// };

// export default AdminDashboard;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend} from 'recharts';
import {Package, ShoppingCart, Users, TrendingUp,IndianRupee, Eye,} from 'lucide-react';


const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

function AdminDashboard() {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        axios.get('http://localhost:3001/orders'),
        axios.get('http://localhost:3001/users'),
        axios.get('http://localhost:3001/products')
      ]);

      const orders = ordersRes.data || [];
      const users = usersRes.data || [];
      const products = productsRes.data || [];

      const dataByDate = {};
      let total = 0;

      // Aggregate sales data
      orders.forEach(order => {
        const date = new Date(order.date).toLocaleDateString();
        const orderTotal = order.total || 0;
        dataByDate[date] = (dataByDate[date] || 0) + orderTotal;
        total += orderTotal;
      });

      // Aggregate category data
      const categoryCount = {};

      products.forEach(product => {
        const category = product.category || 'Unknown';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      // Set states
      setSalesData(Object.entries(dataByDate).map(([date, total]) => ({ date, total })));

      setCategoryData(Object.entries(categoryCount).map(([category, value]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value
      })));

      setTotalRevenue(total);
      setOrders(orders);
      setUsers(users);
      setProducts(products);

      setRecentActivity(orders.slice(-4).reverse().map((order, index) => ({
        id: index + 1,
        type: 'order',
        message: `New order from ${order.user || 'Customer'}`,
        time: new Date(order.date).toLocaleTimeString(),
        amount: `₹${order.total || 0}`
      })));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  fetchData();
}, []);


  const stats = {
    totalRevenue,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalProducts: products.length,
   
  };

  return (
    <>
      
      
        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-500 rounded-2xl p-6 shadow-xl/20 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
                 
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <IndianRupee size={24} className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 rounded-2xl p-6 shadow-xl/20 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalOrders.toLocaleString()}</p>
                 
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <ShoppingCart size={24} className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#8B5CF6] rounded-2xl p-6 shadow-xl/20 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers.toLocaleString()}</p>
                 
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F59E0B] rounded-2xl p-6 shadow-xl/20 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProducts.toLocaleString()}</p>
                  
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Package size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-xl/30 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-xl/20 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Distribution</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={Cell-`${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl/20 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'order' ? 'bg-green-100' : 
                      activity.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'order' ? <ShoppingCart size={18} className="text-green-600" /> :
                       activity.type === 'user' ? <Users size={18} className="text-blue-600" /> :
                       <Package size={18} className="text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <div className="text-sm font-semibold text-green-600">
                        {activity.amount}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-xl/20 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">Categories Sold</p>
                    <p className="text-xl font-bold text-gray-900">{categoryData.length}</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <TrendingUp size={16} className="text-white" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">Sales Days</p>
                    <p className="text-xl font-bold text-gray-900">{salesData.length} days</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Eye size={16} className="text-white" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">Avg Order Value</p>
                    <p className="text-xl font-bold text-gray-900">₹{orders.length > 0 ? Math.round(totalRevenue/ orders.length) : 0}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default AdminDashboard;
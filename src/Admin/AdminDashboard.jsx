import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState('7d');

  // Sample data
  const revenueData = [
    { month: 'Jan', revenue: 4000, orders: 240 },
    { month: 'Feb', revenue: 3000, orders: 139 },
    { month: 'Mar', revenue: 2000, orders: 280 },
    { month: 'Apr', revenue: 2780, orders: 390 },
    { month: 'May', revenue: 1890, orders: 480 },
    { month: 'Jun', revenue: 2390, orders: 380 },
    { month: 'Jul', revenue: 3490, orders: 430 },
  ];

  const categoryData = [
    { name: 'Dark Chocolate', value: 35, sales: 1500 },
    { name: 'Milk Chocolate', value: 25, sales: 1200 },
    { name: 'White Chocolate', value: 20, sales: 800 },
    { name: 'Truffles', value: 15, sales: 600 },
    { name: 'Gift Boxes', value: 5, sales: 200 },
  ];

  const trafficData = [
    { time: '00:00', visitors: 120 },
    { time: '06:00', visitors: 200 },
    { time: '12:00', visitors: 400 },
    { time: '18:00', visitors: 600 },
    { time: '24:00', visitors: 300 },
  ];

  const topProducts = [
    { name: 'Premium Dark 85%', sales: 245, revenue: '$2,450', trend: '+12%' },
    { name: 'Milk Chocolate Truffle', sales: 189, revenue: '$1,890', trend: '+8%' },
    { name: 'White Chocolate Box', sales: 156, revenue: '$1,560', trend: '+5%' },
    { name: 'Caramel Collection', sales: 134, revenue: '$1,340', trend: '-2%' },
  ];

  const recentOrders = [
    { id: '#12345', customer: 'Alice Johnson', product: 'Dark Chocolate Set', amount: '$89.99', status: 'Completed', date: '2 hours ago' },
    { id: '#12346', customer: 'Bob Smith', product: 'Truffle Collection', amount: '$156.50', status: 'Processing', date: '4 hours ago' },
    { id: '#12347', customer: 'Carol Davis', product: 'Gift Box Premium', amount: '$234.00', status: 'Shipped', date: '6 hours ago' },
    { id: '#12348', customer: 'David Wilson', product: 'Milk Chocolate', amount: '$67.25', status: 'Pending', date: '8 hours ago' },
  ];

  const COLORS = ['#8B4513', '#D2691E', '#F4A460', '#DEB887', '#FFDEAD'];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$48,569',
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Total Orders',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: '📦',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Users',
      value: '1,239',
      change: '+15.3%',
      trend: 'up',
      icon: '👥',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Products',
      value: '156',
      change: '+2.1%',
      trend: 'up',
      icon: '🍫',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2]  p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🍫 ChocoLuxe Dashboard
            </h1>
            <p className="text-slate-400">Welcome back! Here's what's happening with your chocolate empire.</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:scale-105 transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10`}></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Revenue & Orders</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm font-medium">Revenue</button>
              <button className="px-3 py-1 bg-slate-600 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-500">Orders</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#F59E0B" 
                fillOpacity={1} 
                fill="url(#revenueGradient)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="text-white font-semibold">${item.sales}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Products */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-slate-400 text-sm">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{product.revenue}</p>
                  <p className={`text-sm ${product.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {product.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website Traffic */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Website Traffic</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#06B6D4" 
                strokeWidth={3}
                dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">2,847</p>
              <p className="text-slate-400 text-sm">Today's Visitors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">68.2%</p>
              <p className="text-slate-400 text-sm">Bounce Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium py-3">Order ID</th>
                <th className="text-left text-slate-400 font-medium py-3">Customer</th>
                <th className="text-left text-slate-400 font-medium py-3">Product</th>
                <th className="text-left text-slate-400 font-medium py-3">Amount</th>
                <th className="text-left text-slate-400 font-medium py-3">Status</th>
                <th className="text-left text-slate-400 font-medium py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-medium">{order.id}</td>
                  <td className="py-4 text-slate-300">{order.customer}</td>
                  <td className="py-4 text-slate-300">{order.product}</td>
                  <td className="py-4 text-white font-semibold">{order.amount}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'Shipped' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
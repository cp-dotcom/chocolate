// import React from 'react';
// import { NavLink, Outlet } from 'react-router-dom';

// const AdminLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100 ">

//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white flex flex-col">
//         <div className="p-5.5 text-2xl font-bold border-b border-black-bold  bg-[#D2C1B6] ">Admin Panel</div>
//         <nav className="flex-1 p-6 space-y-4 bg-[#F0E4D3] text-black ">
//           <NavLink to="/admin/dashboard" className = { ({isActive}) => isActive ?  "block py-2 px-4 rounded-full bg-[#5c2c06] text-white font-bold" : "block py-2 px-4 rounded-full hover:bg-[#5c2c06] text-white font-bold " }>Dashboard</NavLink>  
//           <NavLink to="/admin/products"  className = { ({isActive}) => isActive ?  "block py-2 px-4 rounded-full bg-[#5c2c06] text-white font-bold" : "block py-2 px-4 rounded-full hover:bg-[#5c2c06] text-white font-bold " }>Products</NavLink>
//           <NavLink to="/admin/orders"  className = { ({isActive}) => isActive ?  "block py-2 px-4 rounded-full bg-[#5c2c06] text-white font-bold": "block py-2 px-4 rounded-full hover:bg-[#5c2c06] text-white font-bold " }>Orders</NavLink>
//           <NavLink to="/admin/users"  className = { ({isActive}) => isActive ?  "block py-2 px-4 rounded-full bg-[#5c2c06] text-white font-bold" : "block py-2 px-4 rounded-full hover:bg-[#5c2c06] text-white font-bold " }>Users</NavLink>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
        
//         {/* Top Navbar */}
//         <header className="flex items-center justify-between bg-transparent backdrop-blur-xl px-6 py-4 shadow text-white">
//           <div className="flex items-center">
//             <button className="text-gray-600 p-2 rounded hover:bg-gray-200 focus:outline-none">&#9776;</button>
//             <input
//               type="search"
//               placeholder="Search..."
//               className="ml-4 px-4 py-2 border border-gray-300 rounded focus:outline-none"
//             />
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Outlet />
//         </main>

//         {/* Footer */}
//         <footer className="p-4 bg-white text-center text-gray-500 border-t">
//           © 2025 Your Company
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;





import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-5 text-2xl font-bold border-b border-gray-600 bg-[#D2C1B6] text-gray-800">
          Admin Panel
        </div>
        <nav className="flex-1 p-6 space-y-4 bg-[#F0E4D3]">
          <NavLink 
            to="/admin/dashboard" 
            className={({isActive}) => 
              isActive 
                ? "block py-3 px-4 rounded-full bg-[#5c2c06] text-white font-semibold transition-colors" 
                : "block py-3 px-4 rounded-full hover:bg-[#5c2c06] hover:text-white text-gray-700 font-semibold transition-colors"
            }
          >
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/admin/products" 
            className={({isActive}) => 
              isActive 
                ? "block py-3 px-4 rounded-full bg-[#5c2c06] text-white font-semibold transition-colors" 
                : "block py-3 px-4 rounded-full hover:bg-[#5c2c06] hover:text-white text-gray-700 font-semibold transition-colors"
            }
          >
            Products
          </NavLink>
          
          <NavLink 
            to="/admin/orders" 
            className={({isActive}) => 
              isActive 
                ? "block py-3 px-4 rounded-full bg-[#5c2c06] text-white font-semibold transition-colors" 
                : "block py-3 px-4 rounded-full hover:bg-[#5c2c06] hover:text-white text-gray-700 transition-colors"
            }
          >
            Orders
          </NavLink>
          
          <NavLink 
            to="/admin/users" 
            className={({isActive}) => 
              isActive 
                ? "block py-3 px-4 rounded-full bg-[#5c2c06] text-white font-semibold transition-colors" 
                : "block py-3 px-4 rounded-full hover:bg-[#5c2c06] hover:text-white text-gray-700 font-semibold transition-colors"
            }
          >
            Users
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-sm px-6 py-4 shadow-sm border-b">
          <div className="flex items-center">
            <button className="text-gray-600 p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors">
              &#9776;
            </button>
            <input
              type="search"
              placeholder="Search..."
              className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              🔔
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              👤
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="p-4 bg-white text-center text-gray-500 border-t">
          © 2025 Your Company
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
// import React, { Fragment, useEffect } from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { Menu, Transition } from '@headlessui/react';
// import { Heart, ShoppingCart, User2Icon } from 'lucide-react';
// import { useUser } from "../Context/UserContext"; // ✅ Import context

// const Navbar = () => {
//   const {
//     user,
//     logout,
//     cart,
//     wishlist,
//     fetchCart,
//     fetchWishlist
//   } = useUser(); // ✅ Pull everything from context

//   const navigate = useNavigate();
//   const location = useLocation();
//   const isHome = location.pathname === "/";

//   // Refetch cart/wishlist on route change
//   useEffect(() => {
//     if (user) {
//       fetchCart();
//       fetchWishlist();
//     }
//   }, [location.pathname]); // 🔁 Triggers on page changes

//   return (
//     <nav className={`sticky top-0 z-50 shadow-md transition duration-300 
//       ${isHome ? "bg-transparent backdrop-blur-lg bg-white/10" : "bg-white bg-transparent"}`}>
      
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-black">
//         <NavLink to="/" className="text-3xl font-bold text-black hover:text-[#885537] transition">
//           ChocoLuxe
//         </NavLink>

//         <div className="hidden md:flex gap-6 items-center text-lg">
//           <NavLink to="/" className={({ isActive }) => `hover:text-[#885537] transition ${isActive ? 'underline' : ''}`}>
//             Home
//           </NavLink>

//           <NavLink to="/products" className={({ isActive }) => `hover:text-[#885537] transition ${isActive ? 'underline' : ''}`}>
//             Products
//           </NavLink>

//           <NavLink to="/orders" className={({ isActive }) => `hover:text-[#885537] transition ${isActive ? 'underline' : ''}`}>
//             Orders
//           </NavLink>

//           <NavLink to="/cart" className="relative hover:text-[#885537] transition">
//             <ShoppingCart size={22} />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </NavLink>

//           <NavLink to="/wishlist" className="relative hover:text-[#885537] transition">
//             <Heart size={22} />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
//                 {wishlist.length}
//               </span>
//             )}
//           </NavLink>

//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <Menu.Button className="flex items-center gap-2 hover:text-[#885537] transition text-black">
//                 {user && <span className="text-sm font-medium">{user.username}</span>}
//                 <User2Icon size={22} />
//               </Menu.Button>
//             </div>

//             <Transition
//               as={Fragment}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
//                 <div className="py-1 text-gray-800 text-sm">
//                   {!user ? (
//                     <>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <NavLink
//                             to="/login"
//                             className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
//                           >
//                             Login
//                           </NavLink>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <NavLink
//                             to="/register"
//                             className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
//                           >
//                             Register
//                           </NavLink>
//                         )}
//                       </Menu.Item>
//                     </>
//                   ) : (
//                     <Menu.Item>
//                       {({ active }) => (
//                         <button
//                           onClick={() => {
//                             logout(); // ✅ use logout from context
//                             navigate("/login");
//                           }}
//                           className={`w-full text-left px-4 py-2 ${active ? "bg-gray-100" : ""}`}
//                         >
//                           Logout
//                         </button>
//                       )}
//                     </Menu.Item>
//                   )}
//                 </div>
//               </Menu.Items>
//             </Transition>
//           </Menu>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { Fragment, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Heart, ShoppingCart, User2Icon } from 'lucide-react';
import { useUser } from "../Context/UserContext";

const Navbar = () => {
  const { user, logout, cart, wishlist, fetchCart, fetchWishlist } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

useEffect(() => {
  if (user) {
    fetchCart();
    fetchWishlist();
  }
}, [location.pathname, user]);

  return (
    <nav className={`sticky top-0 z-50 shadow-md transition duration-300 
      ${isHome ? "bg-transparent backdrop-blur-xl bg-white/10" : "bg-white"}`}>
      
    
      
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center "  >


        

        {/* Logo with elegant script font */}
        <NavLink 
          to="/" 
          className="text-3xl font-bold hover:text-[#885537] transition"
          style={{ fontFamily: "'Dancing Script', cursive" }}>
          
          ChocoLuxe
        </NavLink>

        <div className="hidden md:flex gap-6 items-center text-lg">
          {/* Navigation links with clean sans-serif */}
          <NavLink 
            to="/" 
            className={({ isActive }) => `
              hover:text-[#885537] transition
              ${isActive ? 'font-medium text-[#885537]' : ''}
            `}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Home
          </NavLink>

          <NavLink 
            to="/products" 
            className={({ isActive }) => `
              hover:text-[#885537] transition
              ${isActive ? 'font-medium text-[#885537]' : ''}
            `}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Products
          </NavLink>

          <NavLink 
            to="/orders" 
            className={({ isActive }) => `
              hover:text-[#885537] transition
              ${isActive ? 'font-medium text-[#885537]' : ''}
            `}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Orders
          </NavLink>

          {/* Icons with consistent styling */}
          <NavLink 
            to="/cart" 
            className="relative hover:text-[#885537] transition group"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cart.length}
              </span>
            )}
          </NavLink>

          <NavLink 
            to="/wishlist" 
            className="relative hover:text-[#885537] transition group"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Heart size={22} className="group-hover:scale-110 transition-transform" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </NavLink>

          {/* User dropdown with matching font */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button 
                className="flex items-center gap-2 hover:text-[#885537] transition"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {user && <span className="text-sm font-medium">{user.username}</span>}
                <User2Icon size={22} className="hover:scale-110 transition-transform" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items 
                className="absolute right-0 mt-2 w-40 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/10 focus:outline-none z-50"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <div className="py-1 text-gray-800 text-sm">
                  {!user ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/login"
                            className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                          >
                            Login
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/register"
                            className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                          >
                            Register
                          </NavLink>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            logout();
                            navigate("/login");
                          }}
                          className={`w-full text-left px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
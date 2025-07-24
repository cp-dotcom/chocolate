import React, { Fragment, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Heart, ShoppingCart, User2Icon } from 'lucide-react';
import { useUser } from "../Context/UserContext";
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';

const Navbar = () => {
  const { user, logout } = useUser();
  const { fetchCart, cart } = useCart();
  const { fetchWishlist, wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (user) {
      fetchCart();
      fetchWishlist();
    }
  }, [location.pathname, user, fetchCart, fetchWishlist]);

  return (
    <nav className={`sticky top-0 z-50 shadow-md transition duration-300 
      ${isHome ? "bg-transparent backdrop-blur-xl bg-white/10" : "bg-white"}`}>

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <NavLink 
          to="/" 
          className="text-3xl font-bold hover:text-[#885537] transition"
          style={{ fontFamily: "'Dancing Script', cursive" }}>
          ChocoLuxe
        </NavLink>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 items-center text-lg">

          {/* Home */}
          <NavLink 
            to="/" 
            className={({ isActive }) => `
              hover:text-[#885537] transition
              ${isActive ? 'font-medium text-[#885537]' : ''}`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Home
          </NavLink>

          {/* Products */}
          <NavLink 
            to="/products" 
            className={({ isActive }) => `
              hover:text-[#885537] transition
              ${isActive ? 'font-medium text-[#885537]' : ''}`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Products
          </NavLink>

          {/* Orders */}
          <NavLink 
            to="/orders" 
            className={({ isActive }) => `
              hover:text-[#885537] transition
              ${isActive ? 'font-medium text-[#885537]' : ''}`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Orders
          </NavLink>

          {/* Cart - Only show when logged in */}
          {user && (
            <NavLink 
              to="/cart" 
              className="relative hover:text-[#885537] transition group"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </NavLink>
          )}

          {/* Wishlist - Only show when logged in */}
          {user && (
            <NavLink 
              to="/wishlist" 
              className="relative hover:text-[#885537] transition group"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Heart size={22} className="group-hover:scale-110 transition-transform" />
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
          )}

          {/* User Dropdown */}
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

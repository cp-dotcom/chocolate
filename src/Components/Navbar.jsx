import React, { Fragment, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  // Fetch cart and wishlist count when user or path changes
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/carts?userId=${user.id}`)
        .then(res => setCartCount(res.data.length));

      axios
        .get(`http://localhost:3001/wishlist?userId=${user.id}`)
        .then(res => setWishlistCount(res.data.length));
    }
  }, [user, location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    setWishlistCount(0);
    navigate("/login");
  };

  return (
    <nav className="bg-[#6f4e37] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-3xl font-bold hover:text-yellow-100 transition">
          ChocoLuxe
        </NavLink>

        <div className="hidden md:flex gap-6 items-center text-lg">
          <NavLink to="/" className={({ isActive }) => `hover:text-yellow-300 transition ${isActive ? 'underline' : ''}`}>
            Home
          </NavLink>

          <NavLink to="/products" className={({ isActive }) => `hover:text-yellow-300 transition ${isActive ? 'underline' : ''}`}>
            Products
          </NavLink>

          <NavLink to="/cart" className="relative hover:text-yellow-300 transition">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/wishlist" className="relative hover:text-yellow-300 transition">
            🤍
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-1.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center gap-1 hover:text-yellow-200 transition">
                <FaUserCircle size={24} />
                {user && <span className="text-sm font-medium">{user.username}</span>}
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
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
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
                          onClick={handleLogout}
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

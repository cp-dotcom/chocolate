// src/Context/WishlistContext.jsx

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);

  // ✅ Fetch wishlist on login or reload
  const fetchWishlist = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(`http://localhost:3001/wishlist?userId=${user.id}`);
      setWishlist(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch wishlist:', err);
    }
  }, [user?.id]);

  // ✅ Add to wishlist (prevent duplicates)
  const addToWishlist = async (item) => {
    if (!user?.id) return;

    try {
      // Check if item already exists
      const res = await axios.get(
        `http://localhost:3001/wishlist?userId=${user.id}&productId=${item.id}`
      );

      if (res.data.length === 0) {
        const newItem = {
          ...item,
          userId: user.id,
          productId: item.id,
        };
        const response = await axios.post('http://localhost:3001/wishlist', newItem);
        setWishlist((prev) => [...prev, response.data]);
      } else {
        console.warn('⚠️ Item already in wishlist.');
      }
    } catch (error) {
      console.error('❌ Failed to add to wishlist:', error);
    }
  };

  // ✅ Remove from wishlist
  const removeFromWishlist = async (wishlistItemId) => {
    try {
      await axios.delete(`http://localhost:3001/wishlist/${wishlistItemId}`);
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistItemId));
    } catch (error) {
      console.error('❌ Failed to remove from wishlist:', error);
    }
  };

  // ✅ Effect to run on login/logout change
  useEffect(() => {
    if (user?.id) {
      fetchWishlist();
    } else {
      setWishlist([]); // clear on logout
    }
  }, [user?.id, fetchWishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, fetchWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom hook
export const useWishlist = () => useContext(WishlistContext);

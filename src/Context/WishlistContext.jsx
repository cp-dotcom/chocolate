import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist on login
  const fetchWishlist = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:3001/wishlist?userId=${user.id}`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }, [user?.id]);

  // Add to wishlist
  const addToWishlist = async (item) => {
    if (!user?.id) return;
    try {
      // Check if product already exists in wishlist
      const res = await axios.get(
        `http://localhost:3001/wishlist?userId=${user.id}&productId=${item.id}`
      );

      if (res.data.length === 0) {
        const newItem = {
          ...item,
          userId: user.id,
          productId: item.id, // for lookup
        };
        const response = await axios.post("http://localhost:3001/wishlist", newItem);
        setWishlist(prev => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  // Remove from wishlist using wishlistItem.id directly
  const removeFromWishlist = async (wishlistItemId) => {
    try {
      await axios.delete(`http://localhost:3001/wishlist/${wishlistItemId}`);
      setWishlist(prev => prev.filter(item => item.id !== wishlistItemId));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchWishlist();
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

export const useWishlist = () => useContext(WishlistContext);

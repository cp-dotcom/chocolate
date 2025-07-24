import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  // Fetch cart from server
  const fetchCart = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:3001/carts?userId=${user.id}`);
      setCart(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch cart:', err);
    }
  }, [user?.id]);

  // Add item to cart (no duplicates)
  const addToCart = async (item) => {
    if (!user?.id) return;

    try {
      // Check for duplicate product for same user
      const existing = await axios.get(
        `http://localhost:3001/carts?userId=${user.id}&productId=${item.productId}`
      );

      if (existing.data.length > 0) {
        console.warn('⚠️ Product already in cart!');
        return;
      }

      const newItem = { ...item, userId: user.id };
      const res = await axios.post('http://localhost:3001/carts', newItem);

      setCart((prev) => [...prev, res.data]);
      // Optional: await fetchCart(); // for fresh data from DB
    } catch (err) {
      console.error('❌ Failed to add item to cart:', err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/carts/${itemId}`);
      setCart((prev) => prev.filter((item) => item.id !== itemId));
      // Optional: await fetchCart(); // for fresh sync
    } catch (err) {
      console.error('❌ Failed to remove item from cart:', err);
    }
  };

  // On login / reload, get cart
  useEffect(() => {
    if (user?.id) {
      fetchCart();
    } else {
      setCart([]); // Clear cart on logout
    }
  }, [user, fetchCart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

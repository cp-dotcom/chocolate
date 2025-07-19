

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  
  const fetchCart = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:3001/carts?userId=${user.id}`);
      setCart(res.data);
    } catch (err) {
      console.error(' Failed to fetch cart:', err);
    }
  }, [user?.id]);

  
  const addToCart = async (item) => {
    try {
      const newItem = { ...item, userId: user.id };
      const res = await axios.post('http://localhost:3001/carts', newItem);
      setCart(prev => [...prev, res.data]);
    } catch (err) {
      console.error(' Failed to add item to cart:', err);
    }
  };

  
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/carts/${itemId}`);
      setCart(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error(' Failed to remove item from cart:', err);
    }
  };

  
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);

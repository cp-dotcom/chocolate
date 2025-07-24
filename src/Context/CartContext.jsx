import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const addAttempts = useRef({}); // 🟡 Track repeated add attempts by productId

  // ✅ Fetch cart from JSON Server
  const fetchCart = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:3001/carts?userId=${user.id}`);
      setCart(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch cart:', err);
    }
  }, [user?.id]);

  // ✅ Add item to cart with controlled toast
  const addToCart = async (item) => {
    if (!user?.id) return;

    const productId = item.productId || item.id;

    // Local cart check
    const alreadyInCart = cart.some((i) => i.productId === productId);

    if (alreadyInCart) {
      addAttempts.current[productId] = (addAttempts.current[productId] || 0) + 1;
      if (addAttempts.current[productId] >= 2) {
        toast.error("Item already in cart");
      }
      return;
    }

    try {
      // Server check for safety (optional redundancy)
      const res = await axios.get(
        `http://localhost:3001/carts?userId=${user.id}&productId=${productId}`
      );
      if (res.data.length > 0) {
        addAttempts.current[productId] = (addAttempts.current[productId] || 0) + 1;
        if (addAttempts.current[productId] >= 2) {
          toast.error("Item already in cart");
        }
        return;
      }

      const newItem = {
        userId: user.id,
        productId,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: 1,
      };

      const postRes = await axios.post('http://localhost:3001/carts', newItem);
      setCart((prev) => [...prev, postRes.data]);
      toast.success(`${item.name} added to cart`);
      addAttempts.current[productId] = 1; // mark first successful add
    } catch (err) {
      console.error('❌ Failed to add to cart:', err);
    }
  };

  // ✅ Remove item
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/carts/${itemId}`);
      setCart((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('❌ Failed to remove from cart:', err);
    }
  };

  // ✅ Update quantity
  const updateQty = async (itemId, newQty) => {
    try {
      await axios.patch(`http://localhost:3001/carts/${itemId}`, { qty: newQty });
      await fetchCart();
    } catch (err) {
      console.error('❌ Failed to update quantity:', err);
    }
  };

  // ✅ Auto-fetch when user logs in
  useEffect(() => {
    if (user?.id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        fetchCart,
        updateQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

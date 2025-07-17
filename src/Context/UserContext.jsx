import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const login = async (email, password) => {
    try {
      const res = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        const user = res.data[0];
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const fetchCart = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:3001/carts?userId=${user.id}`);
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }, [user?.id]);

  const fetchWishlist = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:3001/wishlist?userId=${user.id}`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }, [user?.id]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCart();
      await fetchWishlist();
    };
    
    fetchData();
  }, [fetchCart, fetchWishlist]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        cart,
        setCart,
        wishlist,
        setWishlist,
        fetchCart,
        fetchWishlist,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
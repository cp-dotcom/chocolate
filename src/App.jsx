
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Products from './Pages/Products';

import Cart from './Components/Cart';
import About from './Pages/About';
import Navbar from './Components/Navbar'
import Wishlist from './Components/Wishlist';
import Checkout from './Pages/Checkout';
import Orders from './Components/Order';
import ProductCard from './Components/ProductCard';

import { UserProvider } from './Context/UserContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import Footer from './Components/Footer';

function App() { 
  return (
    <UserProvider> {/* ✅ Add this */}
     <CartProvider>
        <WishlistProvider>
      <BrowserRouter>
        <Navbar />
       
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/About' element={<About />} />
          <Route path='/Wishlist' element={<Wishlist />} />
          <Route path='/Checkout' element={<Checkout />} />
          <Route path='/Orders' element={<Orders />} />
          <Route path='/ProductCard' element={<ProductCard />} />
          <Route path='/UserProvider' element={<UserProvider />} />
          

        </Routes>
         <Footer/>
      </BrowserRouter>
      </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

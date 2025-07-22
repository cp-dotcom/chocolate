// // src/App.jsx

// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Home from './Pages/Home';
// import Register from './Pages/Register';
// import Login from './Pages/Login';
// import Products from './Pages/Products';
// import Cart from './Components/Cart';
// import About from './Pages/About';
// import Wishlist from './Components/Wishlist';
// import Checkout from './Pages/Checkout';
// import Orders from './Components/Order';
// import ProductCard from './Components/ProductCard';
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';
// import {Toaster} from 'react-hot-toast';


// import { UserProvider } from './Context/UserContext';
// import { CartProvider } from './Context/CartContext';
// import { WishlistProvider } from './Context/WishlistContext';

// function App() {
//   return (
//     <UserProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <BrowserRouter>
//             <Navbar />

//             <Routes>
//               <Route path='/' element={<Home />} />
//               <Route path='/register' element={<Register />} />
//               <Route path='/login' element={<Login />} />
//               <Route path='/products' element={<Products />} />
//               <Route path='/cart' element={<Cart />} />
//               <Route path='/about' element={<About />} />
//               <Route path='/wishlist' element={<Wishlist />} />
//               <Route path='/checkout' element={<Checkout />} />
//               <Route path='/orders' element={<Orders />} />
//               <Route path='/productcard' element={<ProductCard />} />
//             </Routes>

//             <Footer />
//             <Toaster position="top-center" toastOptions={{duration:2000}}/>
//           </BrowserRouter>
//         </WishlistProvider>
//       </CartProvider>
//     </UserProvider>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Products from './Pages/Products';
import Cart from './Components/Cart';
import About from './Pages/About';
import Wishlist from './Components/Wishlist';
import Checkout from './Pages/Checkout';
import Orders from './Components/Order';
import ProductCard from './Components/ProductCard';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Toaster } from 'react-hot-toast';



// ✅ Admin
import AdminDashboard from './Admin/AdminDashboard';
import ProductManagement from './Admin/productManagement';
import OrderManagement from './Admin/OrderManagement';
import UserManagement from './Admin/UserManagement';
import AdminLayout from './Components/Admin/AdminLayout';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/productcard" element={<ProductCard />} />

        {/*  Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </>
  );
}


export default App;




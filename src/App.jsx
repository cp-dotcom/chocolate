import React from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Products from './Pages/Products'
import ProtectedRoute from './auth/ProtectedRoute'
import Cart from './Components/Cart'
import About from './Pages/About'
import Navbar from './auth/Navbar'
import Wishlist from './Components/Wishlist'
import Checkout from './Pages/Checkout'
import Orders from './Components/Order'
// import ProductDetails from './Components/ProductDetails'

function App() {
  
  return (
   <>
   <BrowserRouter>
   <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Products' element={ <Products/>}></Route>
          <Route path='/Cart' element={ <Cart/>}></Route>
          <Route path="/About" element={<About />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Orders" element={<Orders />} />
          {/* <Route path="/Orders" element={<ProductDetails />} /> */}
          
          


      </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App

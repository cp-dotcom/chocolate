import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Products from './Pages/Products'
import ProtectedRoute from './auth/ProtectedRoute'
function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Products' element={ <Products/>}></Route>
      </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App

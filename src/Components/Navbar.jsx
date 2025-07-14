import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate=useNavigate()

  const Logout=()=>{
    localStorage.clear();
    navigate("/Login")
  }
  return (
    <>
        <nav>
        <button onClick={()=>navigate("/")}>Home</button>
        <button onClick={()=>navigate("/Products")}>Products</button>
        <button onClick={Logout}>Logout</button>
        </nav>
    </>
  )
}

export default Navbar

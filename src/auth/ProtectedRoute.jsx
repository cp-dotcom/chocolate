import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({child}) {
    const user=JSON.parse(localStorage.getItem("user"))
    
  return (
    <>
       user ?child:<Navigate to={"/Login"}></Navigate>
    </>
  )
}

export default ProtectedRoute

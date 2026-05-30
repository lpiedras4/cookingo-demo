import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if(!user){
    return <Navigate to="/sign-in" replace />
  }
  return children;
}

export default ProtectedRoute


import React from 'react'
import { useSelector } from "react-redux";
import {Navigate, useLocation  } from 'react-router-dom';
const ProtectedRoute = ({ isAdmin,children }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    let location = useLocation()
    return  isAuthenticated ?
    (
        children

    )
            
    : (
    <Navigate to="/login" state={{ from: location }} />
    )
    
    
    
          
       
    }

export default ProtectedRoute

import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProductedRoute({children}) {
  
    if(localStorage.getItem('tkn') == null ){

        return <Navigate to={'/Login'}></Navigate>
    }
  
  
  
  return<>
  
  {children}
  
  
  </>
}

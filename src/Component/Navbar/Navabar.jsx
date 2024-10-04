import React, { useContext } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../Images/freshcart-logo.svg"
import { authContext } from '../../Context/authContext'
import { cartContext } from '../../Context/cartContext'

export default function Navabar() {
  
 let{myToken , setToken} =  useContext(authContext)
 let nav = useNavigate()
 const{numOfCartItems} =    useContext(cartContext)
 function logout(){
  setToken(null)
  localStorage.removeItem("tkn")

  nav("/Login")

}

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand my-logo " to="#">
    <img src={logo} alt="Fresh Cart" className='w-100 '/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {myToken ?<>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          < Link className="nav-link active" aria-current="page" to="catogeris">Catogeris</ Link>
        </li>
        <li className="nav-item">
          < Link className="nav-link active" aria-current="page" to="brands">Brands</Link>
        </li>
        <li className="nav-item">
          < Link className="nav-link active" aria-current="page" to="product">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="carts">Cart</Link>
        </li>
      </ul>  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item position-relative">
      <Link className="nav-link active mt-1" aria-current="page" to="carts"> <i class=" fs-3 fa-solid fa-cart-shopping"></i></Link>
      <span class="position-absolute mt-3 top-0 start-100 translate-middle badge rounded bg-main">{numOfCartItems > 0 ? numOfCartItems : ""}
 </span>
        </li>
      </ul>
      
      
      </>    : ""}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <li className="nav-item">
        <ul className=' list-unstyled  d-flex  '>
    <li><i className=" m-2 fa-brands fa-instagram"></i></li>
    <li><i className=" m-2 fa-brands fa-facebook"></i></li>
    <li><i className= " m-2 fa-brands fa-tiktok"></i></li>
    <li><i className=" m-2 fa-brands fa-twitter"></i></li>
    <li><i className=" m-2 fa-brands fa-linkedin"></i></li>
    <li><i className=" m-2 fa-brands fa-youtube"></i></li>
            </ul>
        
        </li>
        
        {myToken ?  <li className="nav-item">
          <span  onClick={logout}  role='button' className="nav-link active" aria-current="page" to="Login">Logout</span>
        </li>        :  <>
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="Login">Login</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="Signup">Signup</Link>
        </li>
        
        </>}
       
    
      
       
  
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}

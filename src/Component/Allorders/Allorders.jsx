import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { cartContext } from '../../Context/cartContext';
import { FallingLines } from 'react-loader-spinner';
import { jwtDecode } from "jwt-decode";
import { Helmet } from 'react-helmet';


export default function Allorders() {
 

const [allorders, setAllOrdera] = useState([])

   
 async  function getAllOrders(id){
  const {data} =   await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + id)
  console.log(data);
  setAllOrdera(data)

}      

useEffect(()=>{
  const {id} = jwtDecode(localStorage.getItem('tkn'))    
  console.log(id);

  getAllOrders(id)

} , [])
  
  
  
  return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>All orders</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

  <div className=' container'>
 {allorders.map((orders , idex) => {
  return <div key={idex} className="row">
    <div className=' allorder shadow  rounded p-4 my-5'>

    <div className=" d-flex align-items-center ">
        <h2 className=' fw-bolder'>  #{orders.id} </h2>
        <h4 className=' fw-bolder text-primary mx-4'>  processing</h4>
    </div>
    <p> you have orderd <b>{orders.cartItems.length}</b>  items. </p>
    <div className=' d-flex align-items-center'>
    {orders.cartItems.map((items) =>{
      return<img className=' img-thumbnail rounded me-2'  style={{width:150}} src={items.product.imageCover} alt="" />
      } )}
      </div>
      <hr />
      <p>  <strong>Total Price is  :</strong> {orders.totalOrderPrice} EGP </p>
  </div>
  </div>

 })}
    
    </div>    
  
          
          
          


 
  </>
}
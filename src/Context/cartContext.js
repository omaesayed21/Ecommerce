
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './authContext'

export   let cartContext  =   createContext()
 
export default function CartContextProvider({children}) {

  const {myToken} =   useContext(authContext)

    const [numOfCartItems , setNumOfCartItems] = useState(0)
    const [totaltCartPrice , setTotalCartPrice] = useState(0)
    const [allProducts , setAllProducts] = useState([])
      const [cartId , setCartID] = useState()


      function getProductToCart(){
        axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
          headers:{token:localStorage.getItem('tkn')}
        }).then((res)=>{
            setAllProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            setCartID(res.data.data._id)
            
          }).catch((err) =>{
            console.log(err);
            
        } )
      }

      useEffect(()=>{
        console.log("geeting data");
        
        getProductToCart()
      } , [myToken])


      
     function addProductToCart(id){
   return  axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,{
         "productId":id
        } ,{
            headers:{ token: localStorage.getItem('tkn')}
        } ).then(({data})=> 
          {
            getProductToCart()
         return   data}).catch((err)=>err)
    }

  async  function updateCart( id , count ){
    const boolean =    await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        "count": count
      } , {
        headers:{token:localStorage.getItem('tkn')}
      } ).then((res) =>{
        setAllProducts(res.data.data.products)
        setNumOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
      
        
        
        return true

      } ).catch((err) =>{
        console.log(err);
        return false
        

      } )
      return boolean
    }

  async  function clearAllData(){
    const clritem = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`
       ,{
        headers:{token:localStorage.getItem('tkn')}
       } 
      ).then((res) =>{
        setAllProducts([])
        setNumOfCartItems(0)
        setTotalCartPrice(0)

        return true
      } ).catch((err) =>{
        console.log(err);
        return false
      } )
      return clritem
    }
  async  function deleteProduct(id){
    const delitem = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
       ,{
        headers:{token:localStorage.getItem('tkn')}
       } 
      ).then((res) =>{
        setAllProducts(res.data.data.products)
        setNumOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)

        return true
      } ).catch((err) =>{
        console.log(err);
        return false
      } )
      return delitem
    }


      

  return<>
  
<cartContext.Provider value={{addProductToCart, clearAllData  , updateCart , cartId , numOfCartItems , allProducts , totaltCartPrice , deleteProduct}} >
    
{children}

    
    </cartContext.Provider>  
  </>
}

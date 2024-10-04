import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import './Home.css'
import { useQuery } from 'react-query'
import SimpleSlider from '../HomeSlider/HomeSlider'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { cartContext } from '../../Context/cartContext'
import { ClipLoader } from 'react-spinners'
import { Helmet } from 'react-helmet'
export default function Home() {
//  let [allProducts , setALlProducts] = useState(null)


 const {addProductToCart}   = useContext(cartContext)

 async function addToCartFromHome(id){

  const res = await addProductToCart(id)
        
  if(res.status == "success"){
    toast.success('Product added successfully to your ' , {duration:1500 , position:'top-right', className:"bg-main text-white"})
  }
  else{
    toast.error('Error  occurred')
  }

 }

  async function getAllProducts(){
   return  axios.get('https://ecommerce.routemisr.com/api/v1/products ' ,{
    
   } )


  }
//   async function getAllProducts(){
//     axios.get('https://ecommerce.routemisr.com/api/v1/products').then((res)=>{

//       setALlProducts(res.data.data)
//   }
//   ).catch((err)=>{

//   })
// }
 const {  data , isLoading , error , isFetching  }  =    useQuery('getAllproducts' , getAllProducts , {
  cacheTime:9000
 })
 
 console.log("data" , data?.data.data );
 
//  useEffect(function(){

//   getAllProducts()
//  } ,[]) 
if (isLoading) {
  return <div style={{textAlign:"center"}}>
<ClipLoader
  color="#0aad0a"
  cssOverride={{marginTop:280}}
  speedMultiplier={1}
  size={50}
/>

  </div>


//   <div className=' d-flex vh-100 justify-content-center align-content-center bg-opacity-50 '>

//   <FallingLines
//   color="#4fa94d"
//   width="100"
//   visible={true}
//   ariaLabel="falling-circles-loading"
//   />
// </div>
  
}
 
 return <>


<Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
<div className=' container '>

<div className=' mb-5'>
<SimpleSlider></SimpleSlider>

</div>

  <div className=" products  row g-3">
  {data?.data.data.map((product , idex)  =><div key={idex} className=' col-md-3 mb-1 overflow-hidden product  '>
  <Link to={`/productDetalis/${product.id}`}>
  
  <div className=' m-1'>
  <img src={product.imageCover} className='w-100 mb-2' alt="" />
  <h6 className=' h6 text-main' >{product.category.name} </h6>
    <h2 className=' h6'> {product.title.split(' ').slice(0 , 2).join("-")} </h2>
   <div className=' d-flex justify-content-between'>
  {product.priceAfterDiscount ?    <p className=' d-flex'>  <p className=' text-decoration-line-through me-1'>{product.price}</p> - {product.priceAfterDiscount} EGP  </p>
  :  <p>{product.price} EGP</p>  }

   <p>  <i   class="fa-solid fa-star product-icon  "></i>   {product.ratingsAverage}</p>
   </div>
  

  </div>
    {/* <p> {product.id}</p>   */}

  </Link>

<div className=' mb-3'> 
<button   onClick={()=> addToCartFromHome(product.id)}   className=' add-btn m-auto  d-block   btn bg-main text-white w-50 '>  +Add </button>

</div>

  </div>)}


  </div>

  </div>





  </>
}

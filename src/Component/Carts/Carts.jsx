import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import { FallingLines } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Helmet } from 'react-helmet'

export default function Carts() {

  const [isLoading , setLoading] = useState(true)
const {numOfCartItems , cartId  ,  clearAllData , deleteProduct , allProducts , totaltCartPrice , updateCart} = useContext(cartContext)

if(!allProducts){
  <div className=' d-flex vh-100 justify-content-center align-content-center bg-opacity-50 '>

  <FallingLines
  color="#4fa94d"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
</div>
}
 async function updateCartByButton( id , count ){

  const res =  await updateCart( id , count )
  if(res){
    toast.success('Product updated successfully to your cart ' , {duration:2000 , position:'top-right', className:"bg-main text-white"})
  }
  else{
    toast.success('Error occurred' , {duration:1500 , position:'top-right', className:"bg-main text-white"})

  }
 }


 async  function deleteItemsFromCart(id){
    const res = deleteProduct(id)
    if(res){
      toast.success('Product Deleted successfully from your cart ' , {duration:2000 , position:'top-right', className:"bg-main text-white"})
    }
    else{
      toast.success(' Erorr occurred ' , {duration:1500 , position:'top-right', className:"bg-main text-white"})

    }
}



 async  function clearData(){
  
      const res =  await clearAllData()
      if(res){
        setLoading(false)
      }
      else{
        setLoading(true)
      }
  

}






return<>

    
<Helmet>
                <meta charSet="utf-8" />
                <title>Carts</title>
                <link rel="canonical" href="http://mysite.com/example" />
</Helmet>

  {allProducts.length > 0 ? <div className=' container bg-light rounded py-5 my-5 shadow'>
  <h2 className=' mt-2' > Cart Shop:
  </h2>
      <div className=' d-flex justify-content-between align-items-center'>
      <h4>Total price : <span className=' text-main'>{totaltCartPrice} EGP </span> </h4>
    <div>
  
        <h4>Total number of items: <span className=' text-main'>{numOfCartItems}</span>  </h4>
    </div>
     
      </div>
  {allProducts?.map((products , idex) =>  <div key={idex} className=' mb-2 border-1 border-bottom   row align-items-center'>
  <div className=' col-md-1'>
    <img className=' w-100' src= {products.product.imageCover} alt={products.product.title}/>
  </div>
  <div className=' col-md-9'>
    <h5 className=' fw-bolder'> {products.product.title}</h5>
    <p>{products.price}EGP</p>
    <br />
    {/* <p>{products.product._id}</p> */}
    <button  onClick={ () => deleteItemsFromCart(products.product.id)} className=' btn btn-sm  text-danger'> <i class="fa-solid fa-trash"></i> Remove </button>
    
  </div>
  <div className="col-md-2">
    <div className=''>
      <button  onClick={()=> updateCartByButton(products.product.id ,products.count+1 ) } className=' fw-bolder btn bg-main text-white'>+</button>
      <span className=' m-3'>{products.count}</span>
      <button disabled ={ products.count === 1} onClick={()=> updateCartByButton(products.product.id ,products.count -1 ) }  className=' fw-bolder  btn bg-main text-white'>-</button>
    </div>
  </div>

  </div>

)}


    <div className=' d-flex  justify-content-center align-items-center m-5'>
{isLoading ?     <button onClick={()=> clearData()} className=' btn bg-main py-3 me-2  text-white'> Clear All Data</button>
  :  <div style={{textAlign:"center"}}>
  <ClipLoader
    color="#0aad0a"
    cssOverride={{marginTop:280}}
    speedMultiplier={1}
    size={50}
  />
  
    </div>  }  
  <Link to={`/payment/${cartId}`}>
      <button className=' btn btn-primary ms-2 p-3'> Check Out </button>
      </Link>
    </div>
  </div> :         <div className=' container d-flex justify-content-center bg-main text-white rounded-1 py-5 my-5 bg-opacity-50 fw-bolder '> <h1> Your cart is Empty</h1> </div>
  }

 

  </>
}

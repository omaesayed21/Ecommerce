import axios from 'axios'
import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick'
import { Helmet } from 'react-helmet'
import { ClipLoader } from 'react-spinners'

export default function ProductDetails() {
   
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
   
  const {id} = useParams()

  const {addProductToCart} = useContext(cartContext)

 async function addProduct(id){
  const res =    await  addProductToCart(id)

  console.log(res , " res");
  
  if(res.status == "success"){
    toast.success('Product added successfully to your cart ' , {duration:1500 , position:'top-right', className:"bg-main text-white"})
    console.log("Product added successfully to your cart ya hoby");
    
  }
 
  else{
    console.log(" Error  occurred" );
    toast.error('Error  occurred')
  }
}

  
  function getProductsDetils(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const{data , isLoading , isError , isFetching}  =   useQuery(`getProductsDetiles${id}`,getProductsDetils )
  
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

  const productsDetils = data?.data.data
  
  return<>

<Helmet>
                <meta charSet="utf-8" />
                <title>ProductDetails</title>
                <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
        <div className=' container  p-5' >
            <div className=' row align-items-center'>
                <div className="col-md-3">
                    
                <Slider {...settings}>
                {productsDetils.images.map((cover , idex) => {
                  return <img key={idex}  src={cover} alt="" />
                })}

                </Slider>

                </div>
                <div className=' col-md-9'>
                    <h2 className=' fw-bolder'> {productsDetils.title}</h2>
                    <p>{productsDetils.description}</p>
                    <div className=' d-flex justify-content-between'>
                        <p>{productsDetils.price} EGP </p>
                        <p>  <i   class="fa-solid fa-star product-icon  "></i>   {productsDetils.ratingsAverage}</p>
  
                      
                        </div>
                        {/* <p>{productsDetils.id}</p> */}
                        <button  onClick={()=> addProduct(productsDetils.id)}  className=' btn bg-main text-white w-100'> Add To Cart </button>
                </div>
            </div>
        </div>
  

  
  </>
}


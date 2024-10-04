import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { SquareLoader } from 'react-spinners'

export default function Brands() {

  function getAllBrand(){
    return  axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }


  const{data , isLoading , error} =   useQuery('getAllBrand' , getAllBrand)

  if(isLoading){
    return <div style={{textAlign:"center"}}>
<SquareLoader 
color="#0aad0a" 
  size={50}
  cssOverride={{marginTop:200}}
  
/>


    </div>
    
    

  }

  const allBrand = data.data.data 

return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
<h1 className=' text-main text-center fw-bolder m-3'> All Brand </h1>

  <div className=' container py-5'>
    <div className="row g-5">
    {allBrand.map((brand , idex) =>
           <div key={idex} className="col-md-3 text-center   ">
           <div className=' brands  border  border-light-subtle rounded '>
           <img className=' img-fluid' src={brand.image} alt={brand.name} />
           <h2>{brand.name}</h2>
   
           </div>
         </div>
    )}

 
    </div>

  </div>
  </>
}

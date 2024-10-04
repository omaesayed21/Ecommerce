import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';

export default function Catogeris() {
  
    function getCatogeris(){
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories')

    }
    const {data , isLoading}   =    useQuery("getCatogeris" , getCatogeris)

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
    const catogerisData = data.data.data
    


  return<>

<Helmet>
                <meta charSet="utf-8" />
                <title>Catogeris</title>
                <link rel="canonical" href="http://mysite.com/example" />
</Helmet>

    <div className=' container py-5'>
    <div className="row g-5">
  {catogerisData.map((catogeris , idex) =>{
  return   <div key={idex} className="col-md-4">
     <div className="catogeris border border-1 rounded ">
       <figure>
         <img style={{height:"300px"}}  className=' w-100 ' src={catogeris.image} alt={catogeris.name} />
         <figcaption>
           <h3 className=' m-2  text-main fw-bolder text-center border-1 border-light-subtle'> { catogeris.name}</h3>
         </figcaption>
       </figure>
     </div>
   </div>
  })}
    </div>

    </div>


  </>
}

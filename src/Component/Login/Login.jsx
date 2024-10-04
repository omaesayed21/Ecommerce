import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/authContext';
import './login.css'
import { Helmet } from 'react-helmet';



export default function Login() {
    let [errMsg , setErrMsg] = useState('')
    let [isLoading , setLoading] = useState(true)
    let nav = useNavigate()

    let {setToken} =   useContext(authContext)



    function sendDataToApi(values){
        setLoading(false)        
         axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values ).then(({data}) =>{
            console.log(data);
            if(data.message === "success"){
                nav("/home")
                
                localStorage.setItem('tkn' , data.token)
                setToken(data.token)
                
            }
         }).catch(err=>{
            setErrMsg(err.response.data.message)
                setLoading(true)
         } )
    }


    const validationSchema = Yup.object({
        email:Yup.string().email("Must be a valid email").required("Email is required"),
        password:Yup.string().required("Password is required")
    })
   
    
    function onSubmit(values){
        sendDataToApi(values)
    }
 let myFormik = useFormik({
    initialValues :{
        email:"",
        password:""
    },
    onSubmit,
    validationSchema
    
 })
 
 function ForgetPassword(){
    nav('/ForgetPassword')

}
 
 return<>

<Helmet>
                <meta charSet="utf-8" />
                <title>Login </title>
                <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
  <div className='w-75 m-auto p-5'>
    <h2>login now    </h2>
    <form action="" onSubmit={myFormik.handleSubmit} >
    <label htmlFor="email">Email:</label>
    <input type="text" placeholder='Email' onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.email} className=' form-control mb-3' id='email' />
        {myFormik.errors.email  && myFormik.touched  ?    <div className=' alert alert-danger'>{myFormik.errors.email} </div>    
 : ""}
    <label htmlFor="password">Password:</label>
    <input type="password" placeholder='password' onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.password} className=' form-control mb-3' id='password' />
    {myFormik.errors.password   && myFormik.touched  ?     <div className=' alert alert-danger'>{myFormik.errors.password} </div>    
 : ""}
    {errMsg ?     <div className=' alert alert-danger '>{errMsg}</div>
: ""}
    
    <div className=' d-flex justify-content-between'>

    <span onClick={ForgetPassword} role='button'  className=' mt-2 fp fw-bold '> 
            Forget Your  Password..?
        </span >
    <button type='submit' disabled ={!(myFormik.dirty && myFormik.isValid)}  className='bg-main rounded-3 p-2 btn text-white ms-auto '>
        {isLoading ? " Login now" : <i class="fa-solid fa-spinner fa-spin"></i>}
        </button>
      
    </div>


    

    </form>


  </div>
  
  </>
}

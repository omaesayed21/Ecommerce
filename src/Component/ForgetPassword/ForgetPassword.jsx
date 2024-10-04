import React, { useState } from 'react'
import './forgetpassword.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {

    let[errMsg , setErrMsg] = useState('')
    let [isLoading , setLoading] = useState(true)
    let[form , setForm] = useState(true)

 async function getForgetPasswordApi(value){
 let req  = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , value).then(({data})=>{
    if(data.statusMsg === "success"){
        setForm(false)
        
    }    
 }).catch((err)=>{
        setErrMsg(err.response.data.message)
    })
}
 
async function getRestCodeApi(values){
 let req  = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , values).catch((err)=>{
        setErrMsg(err.response.data.message)
    })
        console.log(req);

}






const validationSchema = Yup.object({
    email:Yup.string().email("Enter Valid Email").required("Email is required")
})

function onSubmit(value){
    console.log(value);
    getForgetPasswordApi(value)
    
}

const myFormik = useFormik({
    initialValues:{
        email:"",
    },
    onSubmit,
    validationSchema
})




const validationSchema2 =Yup.object({
    resetCode:Yup.string().required(" Rest Code is required").matches(/^[0-9]{5,6} $/ , " Rest code not matched")
})


const rstFormik = useFormik({
    initialValues:{
        resetCode:""
    },
    onSubmit:getRestCodeApi,
    validationSchema:validationSchema2
})



return<>

<Helmet>
                <meta charSet="utf-8" />
                <title>Rest Password</title>
                <link rel="canonical" href="http://mysite.com/example" />
</Helmet>

   <div className=' w-75 m-auto p-5'>

    {form ?    <form action="" onSubmit={myFormik.handleSubmit}>
            <label htmlFor="email"> Enter Your  Email</label>
            <input  onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.email} type="email" id='email' className=' form-control m-2' />
            {myFormik.errors.email && myFormik.touched.email ?                 <div  className=' alert alert-danger'>{myFormik.errors.email}</div>
: ""}

            <button type=' submit' className='   verify-btn'> verify</button>
 
 {errMsg ? <div className=' alert alert-danger '>{errMsg}</div>
: "" }

        </form> : 
<form onSubmit={rstFormik.handleSubmit}>
    <label htmlFor="resetCode">Enter Reset Code</label>
    <input
        type="text"
        id="resetCode"  // Make sure this matches the name in formik
        name="resetCode" // Add this line
        className='form-control m-1'
        onBlur={rstFormik.handleBlur}
        onChange={rstFormik.handleChange}
        value={rstFormik.values.resetCode}
    />
    {rstFormik.errors.resetCode && rstFormik.touched.resetCode ? (
        <div className='alert alert-danger'>{rstFormik.errors.resetCode}</div>
    ) : null}
    <button type="submit" className='verify-btn'>Verify Code</button>

    {errMsg ? <div className='alert alert-danger'>{errMsg}</div> : null}
</form>

}
   </div>
</>
}
 
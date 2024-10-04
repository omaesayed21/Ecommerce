import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from "@hookform/error-message"
import { Helmet } from 'react-helmet';


export default function Signup() {

    let [errMsg , setErrMsg] = useState('')
    let[isLoading , setLoading] =useState(true)

    let nav = useNavigate()
     function sendDataToApi(values){
        setLoading(false)
        
         axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values ).then(({data}) =>{
            console.log(data);
            if(data.message === "success"){
                nav("/login")
            }
         }).catch(err=>{
            setErrMsg(err.response.data.message)
            setLoading(true)
            
         } )
    }

  

    function onSubmit(values) {
        console.log('submit', values);
        sendDataToApi(values)
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(12, 'Name must be at most 12 characters'),
        email: Yup.string().email('Must be a valid email').required('Email is required'),
        phone: Yup.string()
            .matches(/^01[1025][0-9]{8}$/, 'Enter a valid phone number')
            .required('Phone number is required'),
        password: Yup.string()
            .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()\-_=+]{6,16}$/, `Enter Valid Password`)
            .required('Password is required'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirming your password is required')
    });

    let myFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },

        onSubmit,
        validationSchema,  // Pass the validation schema directly
    });
    return (
        
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up</title>
                <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
            <div className='w-75 m-auto p-5'>
                <h2>Register Now.....</h2>
                <form onSubmit={myFormik.handleSubmit}>
                    <label htmlFor='name'>Name:</label>
                    <input
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                        value={myFormik.values.name}
                        type='text'
                        placeholder='name'
                        id='name'
                        className='mb-2 form-control  sign-name '
                    />
                    {myFormik.errors.name && myFormik.touched.name ? (
                        <div className='alert alert-danger '>{myFormik.errors.name}</div>
                    ) : null}

                    <label htmlFor='email'>Email:</label>
                    <input
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                        value={myFormik.values.email}
                        type='email'
                        placeholder='email'
                        id='email'
                        className='mb-2 form-control'
                    />
                    {myFormik.errors.email && myFormik.touched.email ? (
                        <div className='alert alert-danger'>{myFormik.errors.email}</div>
                    ) : null}

                    <label htmlFor='password'>Password:</label>
                    <input
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                        value={myFormik.values.password}
                        type='password'
                        placeholder='Password'
                        id='password'
                        className='mb-2 form-control'
                    />
                    {myFormik.errors.password && myFormik.touched.password ? (
                        <div className='alert alert-danger'>{myFormik.errors.password}</div>
                    ) : null}

                    <label htmlFor='rePassword'>Confirm Password:</label>
                    <input
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                        value={myFormik.values.rePassword}
                        type='password'
                        placeholder='Confirm Password'
                        id='rePassword'
                        className='mb-2 form-control'
                    />
                    {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
                        <div className='alert alert-danger'>{myFormik.errors.rePassword}</div>
                    ) : null}

                    <label htmlFor='phone'>Phone:</label>
                    <input
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                        value={myFormik.values.phone}
                        type='text'
                        placeholder='phone'
                        id='phone'
                        className='mb-2 form-control'
                    />
                    {myFormik.errors.phone && myFormik.touched.phone ? (
                        <div className='alert alert-danger'>{myFormik.errors.phone}</div>
                    ) : null}

                        {errMsg ?                     <div className=' alert alert-danger'> {errMsg} </div>
: ""}
                    <button type='submit' disabled={!(myFormik.isValid && myFormik.dirty)}   className='bg-main rounded-3 p-2 btn text-white'>
                        {isLoading ? "Register" :   <i class="fa-solid fa-spinner fa-spin"></i>}
                    </button>
                </form>
            </div>
        </>
    );
}


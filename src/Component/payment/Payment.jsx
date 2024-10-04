import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Payment() {
    const { cartId } = useContext(cartContext);  // Get the cartId from context

    const validationSchema = Yup.object({
        details: Yup.string().required("Details are required"),
        phone: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, 'Enter a valid phone number')
            .required('Phone number is required'),
        city: Yup.string().required("City is required")
    });

    async function onSubmit(values) {
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                {
                    shippingAddress: {
                        details: values.details,
                        phone: values.phone,
                        city: values.city
                    }
                },
                {
                    headers: { token: localStorage.getItem('tkn') }, // Ensure the token is included in the headers
                    params: {
                        url: "http://localhost:3000"
                    }
                }
            );

            console.log(response.data); // Log the response data for debugging

            window.open(response.data.session.url , "_self")

        } catch (error) {
            console.error('Error during payment:', error); // Log any errors for debugging
            toast.error('Payment failed. Please try again.'); // Show error message
        }
    }

    const myFormik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit,
        validationSchema
    });

    return <>
    
<Helmet>
                <meta charSet="utf-8" />
                <title>Payment</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    
    <div className='w-75 m-auto py-5'>
            <form onSubmit={myFormik.handleSubmit}>
                <label htmlFor="details" className='mb-2'>Details:</label>
                <textarea
                    type="text"
                    className='form-control mb-2'
                    onBlur={myFormik.handleBlur}
                    onChange={myFormik.handleChange}
                    value={myFormik.values.details}
                    id='details'
                ></textarea>
                {myFormik.errors.details && myFormik.touched.details ? (
                    <div className='alert alert-danger'>{myFormik.errors.details}</div>
                ) : ""}

                <label htmlFor="phone" className='mb-2'>Phone:</label>
                <input
                    type="text"
                    className='form-control mb-2'
                    onBlur={myFormik.handleBlur}
                    onChange={myFormik.handleChange}
                    value={myFormik.values.phone}
                    id='phone'
                />
                {myFormik.errors.phone && myFormik.touched.phone ? (
                    <div className='alert alert-danger'>{myFormik.errors.phone}</div>
                ) : ""}

                <label htmlFor="city" className='mb-2'>City:</label>
                <input
                    type="text"
                    className='form-control mb-5'
                    onBlur={myFormik.handleBlur}
                    onChange={myFormik.handleChange}
                    value={myFormik.values.city}
                    id='city'
                />
                {myFormik.errors.city && myFormik.touched.city ? (
                    <div className='alert alert-danger'>{myFormik.errors.city}</div>
                ) : ""}

                <button
                    type='submit'
                    disabled={!(myFormik.isValid && myFormik.dirty)}
                    className='btn bg-main w-100 text-white'
                >
                    Pay Now
                </button>
            </form>
        </div>
    
    
    </>
}


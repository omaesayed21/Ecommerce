import React from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Signup from './Component/Signup/Signup'
import Layout from './Component/Layout/Layout'
import Notfound from './Component/NotFound/Notfound'
import Login from './Component/Login/Login'
import Products from './Component/products/Products'
import Home from './Component/Home/Home'
import { UserContextProvider   } from './Context/authContext'
import Catogeris from './Component/Catogeris/Catogeris'
import Brands from './Component/Brands/Brands'
import Carts from './Component/Carts/Carts'
import ProductedRoute from './Component/ProductedRoute/ProductedRoute'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import RestPassword from './Component/RestPassword/RestPassword'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import CartContextProvider from './Context/cartContext'
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import Payment from './Component/payment/Payment'
import Allorders from './Component/Allorders/Allorders'




export default function App() {
  const myRouter = createBrowserRouter([
    {path:'', element :<Layout></Layout> , children:[
      { index : true, element:<Signup></Signup>},
      // {index:true, element:<Signup></Signup>},
<<<<<<< HEAD
=======
      {path:'Signup' , element:<Signup></Signup>},
>>>>>>> 8d3f407 (edit erorr)
      {path:'Login' , element:<Login></Login>},
      {path:"ForgetPassword" , element:<ForgetPassword></ForgetPassword>},
      {path:"RestPassword" , element:<RestPassword></RestPassword>},
      {path:"home" ,element:<ProductedRoute><Home></Home></ProductedRoute>},
      {path:"catogeris" ,element:<ProductedRoute><Catogeris></Catogeris></ProductedRoute>},
      {path:"brands" ,element: <ProductedRoute><Brands></Brands></ProductedRoute>},
      {path:"carts" ,element:<ProductedRoute><Carts></Carts></ProductedRoute>},
      {path:"allorders" ,element:<ProductedRoute><Allorders></Allorders></ProductedRoute>},
      {path:"payment/:id" ,element:<ProductedRoute> <Payment></Payment> </ProductedRoute>},
      {path:"product", element:<ProductedRoute><Products></Products></ProductedRoute>},
      {path:"productDetalis/:id", element:<ProductedRoute><ProductDetails></ProductDetails></ProductedRoute>},
      {path:"*", element:<Notfound></Notfound>}
    ]}

  ])
  
  const myClient = new QueryClient()
  
  return (
  <>
<QueryClientProvider client={myClient}> 
<UserContextProvider>
<CartContextProvider>

<RouterProvider router={myRouter} ></RouterProvider>

</CartContextProvider>
</UserContextProvider>

  
    </QueryClientProvider>
    <Toaster></Toaster>


  </>
  )
}
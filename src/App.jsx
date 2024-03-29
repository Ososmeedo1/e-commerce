import React, { useContext, useEffect } from 'react'
import Navbar from './Component/Navbar/Navbar.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Component/Home/Home.jsx'
import Products from './Component/Products/Products.jsx'
import Categories from './Component/Categories/Categories.jsx'
import Cart from './Component/Cart/Cart.jsx'
import Layout from './Component/Layout/Layout.jsx'
import Brands from './Component/Brands/Brands.jsx'
import Register from './Component/Register/Register.jsx'
import Login from './Component/Login/Login.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import CounterContextProvider from './Context/CounterContext.js'
import UserContextProvider, { UserContext } from './Context/UserContext.js'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx'
import { Toaster } from 'react-hot-toast'
import WishList from './Component/WishList/WishList.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress.jsx'
import AllOrders from './Component/AllOrders/AllOrders.jsx'
import ForgotPassword from './Component/ForgotPassword/ForgotPassword.jsx'
import VerifyCode from './Component/VerifyCode/VerifyCode.jsx'
import ResetPassword from './Component/ResetPassword/ResetPassword.jsx'

export default function App() {

  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'shippingaddress/:cartId', element: <ProtectedRoute><ShippingAddress/></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'forgetpassword', element: <ForgotPassword /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'verifycode', element: <VerifyCode /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  let { setUserToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, [])

  return <>
    <Provider store={store}>
      <CounterContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
      </CounterContextProvider>
    </Provider>






  </>
}

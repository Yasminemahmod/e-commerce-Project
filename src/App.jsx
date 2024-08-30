import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import WishList from './components/WishList/WishList'
import { UserContextProvider } from './context/UserContext'
import Brands from './components/Brands/Brands'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ShowProduct from './components/ShowProduct/ShowProduct'
import CartContextProvider from './context/CartContext'
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import Orders from './components/Orders/Orders'
import WishListContextProvider from './context/WishListContext'
import SendCode from './components/SendCode/SendCode'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import NotFound from './components/NotFound/NotFound'




function App() {
  const [count, setCount] = useState(0)
  const routes = createBrowserRouter([
    {path: "", element: <LayOut />, children: [
      {index: true, element:<ProtectedRoute><Home /></ProtectedRoute>},
      {path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
      {path: "categories", element:<ProtectedRoute><Categories /></ProtectedRoute>},
      {path:"products", element: <ProtectedRoute><Products /></ProtectedRoute>},
      {path:"productDetails/:id", element: <ProtectedRoute><ShowProduct /></ProtectedRoute>},
      {path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute>},
      {path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute>},
      {path: "checkout/:id", element: <ProtectedRoute><CheckOut /></ProtectedRoute>},
      {path: "allorders", element: <ProtectedRoute><Orders /></ProtectedRoute>},
      {path: "forget-password", element: <SendCode />},
      {path: "verify-code", element: <VerifyCode />},
      {path: "reset-password", element: <ResetPassword />},
      {path:"login", element: <Login />},
      {path: "register", element: <Register />},
      {path: '*', element: <NotFound />}
    ]}
  ]);

  return (
    <>
    {/* <div className='flex justify-center items-center absolute z-10 top-0 bottom-0 start-0 end-0 bg-gray-600 bg-opacity-50'>
    <i className='fas fa-spinner fa-spin text-6xl text-white'></i>
    </div> */}
      <UserContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
              <RouterProvider router={routes}></RouterProvider>
              <Toaster />
          </CartContextProvider>
        </WishListContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App

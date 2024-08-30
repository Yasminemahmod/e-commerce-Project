import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Cart() {
    const [cartDetails, setCartDetails] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [cartId, setCartId] = useState(true)

    const { getLoggedUserCart,clearCart, updateCartProductQuantity, deleteSpeceficItem, setCart} = useContext(CartContext)
    

  async function getCartItems() {
    let cartResponse = await getLoggedUserCart()  
    setCartId(cartResponse?.data?._id)
    if(cartResponse.status === 'success') {
      setCartDetails(cartResponse.data)
      setPageLoading(false)
      setCart(cartResponse.numOfCartItems)
      setTotalPrice(cartResponse.data.totalCartPrice)
      setTotalItems(cartResponse.numOfCartItems)
    } else if(cartResponse.status === 'failed') {
        setPageLoading(false)
    }
  }

  async function clearCartItems() {
    await clearCart()
    setCartDetails(null)
    setTotalPrice(0)
    setTotalItems(0)
  }

  async function updateProductQuantity(id,count) {
    let response = await updateCartProductQuantity(id, count)
    setCart(response.data)
  }

  async function deleteProduct(id) {
    let response = await deleteSpeceficItem(id)
    setCart(response.data)
  }

  

  useEffect(() => {
    getCartItems() 
  })

  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    {pageLoading ? <div className="spinner bg-black bg-opacity-50 flex justify-center items-center h-lvh">
    <i className='fas fa-spinner fa-spin text-6xl text-white'></i>
    </div> : <div className="container my-32">
    {cartDetails && cartDetails?.products.length !== 0 ? <div className='cartTable w-full bg-gray-100 p-10 rounded-md'>
      
      <div className='row flex justify-between items-center'>
        <h2 className='text-3xl font-semibold'>Cart Shop</h2>
        <div className=''>
          <Link to={`/checkout/${cartId}`}><button className="bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 duration-300 text-xl">check out</button></Link>
        </div>
      </div>

      <div className='row flex justify-between items-center mt-5'>
        <p className='text-xl font-medium'>total price: <span className='text-green-500'>{totalPrice}</span></p>
        <p className='text-xl font-medium'>total number of items: <span className='text-green-500'>{totalItems}</span></p>
      </div>
      
      {cartDetails?.products?.map((product) => <div key={product?._id} className='row flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center mt-5 pb-2 px-5 border-b'>
        <div className='product flex flex-wrap md:flex-nowrap items-center w-full md:w-auto'>
          <div className="img me-3 w-full md:w-40">
            <img className='' src={product?.product?.imageCover} alt={product?.product?.title} />
          </div>
          <div className="dec text-center md:text-start w-full md:w-auto mt-3">
            <h3 className='text-xl font-medium'>{product?.product?.title}</h3>
            <p className='font-medium my-1'>{product?.price} EGP</p>
            <button onClick={() => {deleteProduct(product?.product?.id)}} className="remove text-red-600 text-sm">
              <i className="fa-solid fa-trash me-1"></i>
              Remove
            </button>
          </div>
        </div>
        <div className='amount flex items-center gap-5 w-full md:w-auto justify-center mt-3'>
          <button onClick={() => {updateProductQuantity(product?.product?.id, product?.count+1 )}} className='plus px-3 py-1.5 border border-1 border-green-500 rounded-md'>+</button>
          <div className="count">{product?.count}</div>
          <button onClick={() => {updateProductQuantity(product?.product?.id, product?.count-1 )}} className='minus px-3.5 py-1.5 border border-1 border-green-500 rounded-md'>-</button>
        </div>
      </div>)}

      <div className="row py-5 text-center">
        <button onClick={clearCartItems} className="clear py-2 px-5 border border-1 border-green-500 rounded-md text-xl hover:text-white hover:bg-green-500 duration-500">Clear Your Cart</button>
      </div>
      </div> : <div className='cartTable w-full bg-gray-100 p-10 rounded-md'> 
        <h2 className='text-3xl font-semibold'>Cart Shop</h2>
        <h2 className='text-3xl font-semibold mt-7'>your cart is empty</h2>
    </div>}
  </div>}
  </>
}

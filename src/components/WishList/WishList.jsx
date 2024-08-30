import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { Link } from 'react-router-dom'
import {WishListContext} from '../../context/WishListContext'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet'


export default function WishList() {
  const [pageLoading, setpageLoading] = useState(true)
    const [wishListDetails, setWishListDetails] = useState([])
    const [currentProductId, setcurrentProductId] = useState(null)
    const {addToCart,setCart} = useContext(CartContext)
    const [wishedProducttId, setwishedProducttId] = useState(null)
    const {getLoggedWishList, deleteSpeceficItem,setWishList,wishList} = useContext(WishListContext)
    
    const notify = () => toast('It has been successfully added');

    async function addItemToCart(id) {
      setcurrentProductId(id)
      let response = await addToCart(id)
      // console.log(response.data);
      // console.log(wishList);
      
      
      if(response.data.status === 'success') {
        setCart(response.data.numOfCartItems)
        toast.success(response.data.message, {
          duration: 2000,
          position: 'top-right',
          style: {
            marginTop: '30px',
          },
        })
      } else {
        toast.error(response.data.message, {
          duration: 2000,
          position: 'top-right',
          style: {
            marginTop: '30px',
          },
        })
      }
      
    }


    async function getWishListItems() {
      let response = await getLoggedWishList()
      setWishList(response.data.data)            
      if(response.data.status === 'success') {
        setpageLoading(false)
        setWishListDetails(response.data.data)
      }
  }

  async function deleteItem(id) {
    let {data} = await deleteSpeceficItem(id)
    setWishListDetails(data.data)
  }

  

  useEffect(() => {
    getWishListItems() 
    // console.log(wishList);
    
  })

  return <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Wish List</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  {pageLoading ? <div className="spinner bg-black bg-opacity-50 flex justify-center items-center h-lvh">
    <i className='fas fa-spinner fa-spin text-6xl text-white'></i>
  </div> : <div className="container my-32">
    {wishListDetails ? <div className='cartTable w-full bg-gray-100 p-10 rounded-md'>
      
      <div className='row flex justify-between items-center'>
        <h2 className='text-3xl font-semibold'>My wish List</h2>
      </div>

      
      {wishListDetails?.map((product) => <div key={product?.id} className='row flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center mt-5 pb-2 px-5 border-b'>
        <div className='product flex flex-wrap md:flex-nowrap items-center w-full md:w-auto'>
          <div className="img me-3 w-full md:w-40">
            <img className='' src={product?.imageCover} alt={product?.title} />
          </div>
          <div className="dec text-center md:text-start w-full md:w-auto mt-3">
            <h3 className='text-xl font-medium'>{product?.title}</h3>
            <p className='font-medium my-1'>{product?.price} EGP</p>
            <button onClick={() => {deleteItem(product?.id)}} className="remove text-red-600 text-sm">
              <i className="fa-solid fa-trash me-1"></i>
              Remove
            </button>
          </div>
        </div>
        <button onClick={() => {addItemToCart(product?.id)}} className='border border-green-600 duration-500 hover:text-white hover:bg-green-600 py-3 px-4 text-lg rounded-md'>add to card</button>
      </div>)}

  </div> : <div className='cartTable w-full bg-gray-100 p-10 rounded-md'> 
        <h2 className='text-3xl font-semibold'>My Wish List</h2>
        <h2 className='text-3xl font-semibold mt-7'>your Wish List is empty</h2>
    </div>}


    </div>}
    
  </>
}

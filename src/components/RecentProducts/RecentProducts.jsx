import React, { useContext, useEffect, useState } from 'react'
import style from "./RecentProducts.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../context/WishListContext';


export default function RecentProducts() {
  const [products, setProducts] = useState([])
  const [productsCopy, setProductsCopy] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentProductId, setcurrentProductId] = useState(null)
  const [wishList , setWishList] = useState([])
  const {addToCart,setCart} = useContext(CartContext)
  const {addToWishList, deleteSpeceficItem} = useContext(WishListContext)

  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((productsRes) => {
      setIsLoading(false)
      setProducts(productsRes.data.data)
      
          // getLoggedWishList
        function getLoggedWishList() {
          return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers : {
              token: localStorage.getItem('userToken')
            }})
          .then((wishListRes) => {
              setWishList(wishListRes.data.data)
              wishListProducts(productsRes.data.data,wishListRes.data.data)
              return data.data
          }) 
          .catch((error) => error)
      }
      getLoggedWishList()
    }).catch((error) => {
      setIsLoading(false)
      return error})
  }


  function wishListProducts(product, wishListProduct) {
    for(let i=0; i< product?.length; i++) {
      for(let j=0; j < wishListProduct?.length; j++) {
        if(product[i]?.id === wishListProduct[j]?.id) {
          document.querySelectorAll('.product .fa-heart')[i].classList.remove('text-slate-900');
          document.querySelectorAll('.product .fa-heart')[i].classList.add('text-red-600');
        }
      }
  }}



  // For Searching
  function filteredProducts(e) {
    if(!e.target.value) return setProducts(products)
    const filtered = products.filter(product => product.title.toLowerCase().includes(e.target.value))
    setProductsCopy(filtered)
  }


  function toggleWishListProduct(id) {
    // To delete from wish List 
    async function deleteWishLidtProduct(id) {
      let response = await deleteSpeceficItem(id)
      colorToggle(id)
    }

    // To add to wish List       
    async function addItemToWishList(id) {
      let response = await addToWishList(id)
      colorToggle(id)
    }

    for (let i =0; i<wishList.length; i++) {
      if(wishList[i]._id === id) {
        deleteWishLidtProduct(id)
      } else {
        addItemToWishList(id)
      }
      
    }
    
    
  }


  function colorToggle(id) {
    document.querySelectorAll('.product').forEach(ele => {
      if(ele.classList.contains(id)) {
        ele.querySelector('.fa-heart').classList.toggle('text-slate-900')
        ele.querySelector('.fa-heart').classList.toggle('text-red-600')
        
      }
    })
  }


  // To add items to cart
  const notify = () => toast('It has been successfully added');
  async function addItemToCart(id) {
    setIsLoading(true)
    setcurrentProductId(id)
    let response = await addToCart(id)

    if(response.data.status === 'success') {
      setCart(response.data.numOfCartItems)
      setIsLoading(false)
      toast.success(response.data.message, {
        duration: 2000,
        position: 'top-right',
        style: {
          marginTop: '30px',
        },
      })
    } else {
      setIsLoading(false)
      toast.error(response.data.message, {
        duration: 2000,
        position: 'top-right',
        style: {
          marginTop: '30px',
        },
      })
    }
  }


  useEffect(() => {
    getProducts()
  }, [])


  return <>
    {isLoading ? <div className="spinner bg-black bg-opacity-50 flex justify-center items-center h-lvh">
      <i className='fas fa-spinner fa-spin text-6xl text-white'></i>
      </div> : <div className="container">
        <form className="max-w-4xl mx-auto mb-10">   
          <div className="relative">
              <input onChange={filteredProducts} type="text" name='productSearch' id="default-search" className="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search..." />
          </div>
        </form>
        <div className="products pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {productsCopy.length === 0 ? products.map(product => <div key={product?.id} className={`${style.productCard} product ${product?.id} pb-3 duration-300 overflow-hidden  rounded-md`}>
              <Link to={`/productDetails/${product?.id}`}>
              <div className="img w-full overflow-hidden">
                <img src={product?.imageCover} alt="" />
              </div>
              <div className="desc px-2 py-4">
                <h3 className="cat text-green-600 mb-3">{product?.category.name}</h3>
                <p className="productName font-semibold">{product?.title.split(' ').slice(0,2).join(" ")}</p>
                <div className="info flex my-2 justify-between"> 
                  <span className="price">{product?.price} EGP</span>
                  <span className="rate">
                    <i className="fas fa-star text-yellow-500"></i>
                    {product?.ratingsAverage}
                  </span>
                </div>
              </div>
              </Link>
              <div className="fav text-center">
                  <button onClick={() => {addItemToCart(product?.id)}} className={`${style.btn} duration-500 bg-green-500 text-white w-3/4 rounded-md py-1 me-1 translate-y-20 opacity-0`}>
                    {currentProductId == product?.id && isLoading ? <i className='fas fa-spinner fa-spin'></i>: '+ Add'}</button>
                    <i onClick={() => toggleWishListProduct(product?.id)} className={`fa-solid fa-heart cursor-pointer place-self-end text-2xl`}></i>
              </div>
            </div>) : productsCopy.map(product => <div key={product?.id} className={`${style.productCard} pb-3 duration-300 overflow-hidden  rounded-md`}>
              <Link to={`/productDetails/${product?.id}`}>
              <div className="img w-full overflow-hidden">
                <img src={product?.imageCover} alt="" />
              </div>
              <div className="desc px-2 py-4">
                <h3 className="cat text-green-600 mb-3">{product?.category.name}</h3>
                <p className="productName font-semibold">{product?.title.split(' ').slice(0,2).join(" ")}</p>
                <div className="info flex my-2 justify-between"> 
                  <span className="price">{product?.price} EGP</span>
                  <span className="rate">
                    <i className="fas fa-star text-yellow-500"></i>
                    {product?.ratingsAverage}
                  </span>
                </div>
              </div>
              </Link>
              <div className="fav text-center">
                  <button onClick={() => {addItemToCart(product?.id)}} className={`${style.btn} duration-500 bg-green-500 text-white w-3/4 rounded-md py-1 me-1 translate-y-20 opacity-0`}>
                    {currentProductId == product?.id && isLoading ? <i className='fas fa-spinner fa-spin'></i>: '+ Add'}</button>
                    <i onClick={() => toggleWishListProduct(product?.id)} className={`fa-solid fa-heart cursor-pointer place-self-end text-2xl`}></i>
              </div>
            </div>)}
          </div>
        </div>
    </div>}
  </>
}

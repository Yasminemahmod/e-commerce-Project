import React, { useContext, useState } from 'react'
import style from './NavBar.module.css'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'




export default function NavBar() {
  const {cart} = useContext(CartContext)
    let {userLogin,setUserLogin} = useContext(UserContext)  
    // console.log(cart);
      

    function logOut() {
      setUserLogin(null);
      localStorage.removeItem('userToken')
    }


    function dropDownMenu() {
      if(userLogin !== null) {
        document.querySelector('.nav').classList.toggle('h-96')
        document.querySelector('.nav').classList.toggle('h-20')
        document.querySelector('.Links').classList.toggle('opacity-0')
        document.querySelector('.Links').classList.toggle('opacity-100')
      } else {
        document.querySelector(".nav").classList.toggle('h-44')
        document.querySelector(".nav").classList.toggle('h-20')
        document.querySelector('.Links').classList.toggle('opacity-0')
        document.querySelector('.Links').classList.toggle('opacity-100')
      }
    }



  return <>
    <div className="nav h-20 overflow-hidden duration-500 lg:h-auto bg-gray-100 fixed top-0 start-0 end-0 z-20">
      <div className="container py-4 flex items-center justify-between">
        <Link to={''}>
          <div className="logo h-auto flex flex-auto items-center text-3xl">
              <i className="fa-solid fa-cart-shopping text-green-600 flex-auto"></i>
              <p className='font-semibold flex-auto'>fresh cart</p>
          </div>
        </Link>
        {userLogin !== null ? <> 
                
          <ul className="flex links  lg:relative lg:top-0 lg:p-0 absolute top-20 px-16 py-2 start-0 end-0 flex-col lg:flex-row justify-center">
            <li className='text-gray-600 mb-3 lg:mb-0 me-4'><NavLink to={''}>Home</NavLink></li>
            <li className='text-gray-600  mb-3 lg:mb-0 me-4'><NavLink to={'cart'}>Cart</NavLink></li>
            <li className='text-gray-600  mb-3 lg:mb-0 me-4'><NavLink to={'wishlist'}>Wish List</NavLink></li>
            <li className='text-gray-600  mb-3 lg:mb-0 me-4'><NavLink to={'products'}>Products</NavLink></li>
            <li className='text-gray-600  mb-3 lg:mb-0 me-4'><NavLink to={'categories'}>Categories</NavLink></li>
            <li className='text-gray-600  mb-3 lg:mb-0 me-4'><NavLink to={'brands'}>Brands</NavLink></li>
          </ul></> : null}

        <div className="out flex gap-5 absolute top-20 px-16 py-2 start-0 end-0 flex-col lg:flex-row justify-center items-center text-gray-600 lg:relative lg:top-0 lg:p-0 ">
          {userLogin === null ?
            <div className='links lg:flex gap-5 text-center'>
            <p><NavLink to={'register'}>Register</NavLink></p>
            <p><NavLink to={'login'}>Log in</NavLink></p>
            </div> : <>
            <div className="out lg:relative lg:top-0 lg:p-0  lg:flex absolute top-52 px-16 py-5 text-center start-0 end-0">
              <NavLink to={'cart'}>
                <i className="fa-solid fa-cart-shopping mb-3 lg:mb-0 lg:me-5 flex-auto text-3xl relative">
                  <span className={`${style.cartCount} bg-green-600 text-white rounded-md absolute bottom-4 left-4`}>{cart}</span>
                </i>
              </NavLink>
              <p><Link to={'login'} onClick={logOut}>log out</Link></p>
            </div>

            </> }

        </div>
        <div onClick={dropDownMenu} className="linkBars hover:cursor-pointer block lg:hidden py-2 px-3 border-2 border-gray-300 rounded-md">
              <i className="fa-solid fa-bars text-3xl "></i>
            </div>
      </div>
    </div>
  </>
}

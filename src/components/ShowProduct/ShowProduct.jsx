import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './ShowProduct.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function ShowProduct() {
    const [details, setDetails] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [currentProductId, setcurrentProductId] = useState(null)
    const {addToCart,setCart} = useContext(CartContext)
    let {id} = useParams()

    let sliderRef = useRef(null);
    const next = () => {
      sliderRef.slickNext();
    };
    const previous = () => {
      sliderRef.slickPrev();
    };

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };


    function showProductDetails() {
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({data}) => {
        setPageLoading(false)
        setDetails(data.data)
      }).catch((response) => {
        setPageLoading(false)
      })
    }
    



    const notify = () => toast('It has been successfully added');
    async function addItemToCart(id) {
      setIsLoading(true)
      setcurrentProductId(id)
      let response = await addToCart(id)
      console.log(response.data);
      
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
      showProductDetails()
    }, [])


  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Product Details</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  {pageLoading ? <div className="spinner bg-black bg-opacity-50 flex justify-center items-center h-lvh">
    <i className='fas fa-spinner fa-spin text-6xl text-white'></i>
    </div> : <div className="container">
      <div className={`mt-32 flex items-center gap-10 duration-500 mx-2`}>
        <div className="img w-1/3">
          <Slider ref={slider => sliderRef = slider} {...settings}>
            {details?.images.map((src) => <img src={src} className='w-full' alt={details?.title} />)}
          </Slider>
          <div style={{ textAlign: "center" }}>
            <button className="button bg-gray-300 rounded-xl px-2 py-1 me-2" onClick={previous}></button>
            <button className="button bg-gray-300 rounded-xl px-2 py-1" onClick={next}></button>
          </div>
        </div>
        <div className="productdesc pb-7">
          <h3 className="title font-semibold text-3xl">{details?.title}</h3>
          <p className="productDesc text-md mt-1 mb-3">{details?.description}</p>
          <div className="desc flex justify-between items-center pt-1 pb-4">
            <p className="price">{details?.price} EGP</p>
            <div className="rate flex items-center">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <p className='ms-1'>{details?.ratingsAverage}</p>
            </div>
          </div>
          <div className="favorite relative">
          <button onClick={() => {addItemToCart(details?.id)}} className={`duration-500 text-white bg-green-500 hover:bg-green-600 block w-3/4 mx-auto py-1 rounded-md`}>
          {currentProductId == details?.id && isLoading ? <i className='fas fa-spinner fa-spin'></i>: '+ Add'}</button>
            <i className="fa-solid fa-heart absolute top-0 end-2 text-2xl text-gray-800"></i>
          </div>
        </div>
      </div>
    </div>}
  </>
}

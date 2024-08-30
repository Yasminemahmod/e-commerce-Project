import React, { useEffect, useRef, useState } from 'react'
import style from './ProductsSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';

export default function ProductsSlider() {
  const [categories, setCategories] = useState()

  function getProductsCat() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data}) => {
      setCategories(data.data)
    }).catch((error) => error)
  }


  useEffect(() => {
    getProductsCat()
  }, [])


  
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
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
    responsive: [
      {
        breakpoint: 965,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 756,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  return <>
    <div className="slider">
      <Slider ref={slider => sliderRef = slider} {...settings}>
        {categories?.map((category) => <div key={category?._id} className="cat mt-20">
          <div className="img">
            <img src={category?.image} alt={category?.name} className='w-full h-64' />
          </div>
          <p className='title text-gray-900 text-md md:text-xl lg:text-3xl font-semibold'>{category?.name}</p>
        </div>)}
      </Slider>
      <div style={{ textAlign: "center" }}>
        <button className="button bg-gray-300 rounded-xl px-2 py-1 me-2" onClick={previous}></button>
        <button className="button bg-gray-300 rounded-xl px-2 py-1" onClick={next}></button>
      </div>
    </div>
    </>
}

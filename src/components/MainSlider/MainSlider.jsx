import React, { useRef, useState } from 'react'
import style from './MainSlider.module.css'
import bags from '../../assets/bags.jpg'
import music from '../../assets/music.jpg'
import mainSliderImg1 from '../../assets/mainSliderImg1.jpg'
import mainSliderImg2 from '../../assets/mainSliderImg2.jpg'
import mainSliderImg3 from '../../assets/mainSliderImg3.jpg'
import Slider from "react-slick";


export default function MainSlider() {
    const [state, setState] = useState()
    
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
      arrows:false,
    };


  return <>
    <div className="flex mt-32 gap-0 mx-auto flex-wrap max-w-2xl">
      <div className="main-slider sm:w-1/2 w-full">
        <Slider ref={slider => sliderRef = slider} {...settings}>
          <div key={1}>
            <img className='w-full' src={mainSliderImg1} alt="Sloder Image 1" />
          </div>
          <div key={2}>
          <img className='w-full' src={mainSliderImg2} alt="Sloder Image 2" />
          </div>
          <div key={3}>
          <img src={mainSliderImg3} alt="Sloder Image 3" />
          </div>
        </Slider>
        <div style={{ textAlign: "center" }}>
                <button className="button bg-gray-300 rounded-xl px-2 py-1 me-2" onClick={previous}></button>
                <button className="button bg-gray-300 rounded-xl px-2 py-1" onClick={next}></button>
        </div>
      </div>
      <div className="imgs sm:w-1/2 w-full" >
        <img src={bags} alt='bags image' className='h-1/2 w-11/12 sm:w-auto mx-auto' />
        <img src={music} alt="music equipments" className='h-1/2 w-11/12 sm:w-auto mx-auto' />
      </div>
    </div>
  </>
}

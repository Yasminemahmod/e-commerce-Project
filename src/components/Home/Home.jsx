import React from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import MainSlider from '../MainSlider/MainSlider'
import ProductsSlider from '../ProductsSlider/ProductsSlider'
import {Helmet} from "react-helmet";


export default function Home() {

  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className='my-16'>
      <MainSlider />
      <ProductsSlider />
      <div className="mt-5">
        <RecentProducts />
      </div>
    </div> 
      </>

}

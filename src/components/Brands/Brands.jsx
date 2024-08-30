import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'



export default function Brands() {
    const [brands, setBrands] = useState([])
    const [specificBrand, setSpecificBrand] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [specPageLoading, setspecPageLoading] = useState(true)

    function getBrands() {
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({data}) => {
        setPageLoading(false)
        setBrands(data.data)
      }).catch((error) => {
        setPageLoading(false)
        return error})
    }


    async function getSpecificId(id) {
      await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then(({data}) => {
        setspecPageLoading(false)
        setSpecificBrand(data.data)
      }).catch((error) => {
        setspecPageLoading(false)
        return error})
      showPopUp()
    }

    function showPopUp() {
      document.querySelector('.popUpBg').classList.toggle('hidden')
    }


    useEffect(() => {
      getBrands()
    }, [])


  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    {pageLoading ? <div className="spinner bg-black bg-opacity-50 flex justify-center items-center h-lvh">
    <i className='fas fa-spinner fa-spin text-6xl text-white'></i>
      </div> : <div className="container">
        <div className="mt-20">
          <h2 className='text-center text-4xl text-green-600 font-semibold'>All Brands</h2>
          <div className="brands grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
            {brands?.map((brand) => <div onClick={() => {getSpecificId(brand?._id)}} key={brand?._id} className={`${style.brandCard} duration-500 border border-1 border-gray-300 rounded-md overflow-hidden`}>
              <div className="img">
                <img src={brand?.image} alt={brand?.name} className='bg-red-500 h-32' />
              </div>
              <p className="title text-center py-7">{brand?.name}</p>
            </div>)}
          </div>

          {specPageLoading ? <div className="spinner bg-black bg-opacity-50 flex justify-center items-center h-lvh">
          <i className='fas fa-spinner fa-spin text-6xl text-white'></i>
            </div> : <div className="popUpBg hidden">
              <div onClick={showPopUp} className="layout bg-black bg-opacity-50 absolute z-40 start-0 end-0 top-0 bottom-0"></div>
              <div className="brandPopUp bg-white absolute top-5 start-1/2 -translate-x-1/2 z-50 w-4/5 md:w-2/5 rounded-md ">
                <div onClick={showPopUp} className="closeIcon cursor-pointer border-b text-end">
                  <i class="fa-solid fa-xmark p-4 text-3xl text-gray-600 hover:text-gray-700"></i>
                </div>
                <div className="popUpcont flex p-4 items-center">
                  <div className="title w-1/2">
                    <p className='mb-3 font-semibold text-4xl text-green-600'>{specificBrand?.name}</p>
                    <p>{specificBrand?.slug}</p>
                  </div>
                  <div className="img w-1/2">
                    <img className='w-3/4' src={specificBrand?.image} alt="" />
                  </div>
                </div>
                <div className="closeBtn p-4 border-t text-end">
                  <button onClick={showPopUp} className='bg-gray-600 py-2 px-3 rounded-md text-white focus:outline-none hover:bg-gray-700'>Colse</button>
                </div>
              </div>
            </div>}
        </div>
    </div> }
  </>
}

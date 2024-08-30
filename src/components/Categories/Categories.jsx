import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'


export default function Categories() {
    const [categories, setCategories] = useState()
    const [specificCategory, setSpecificCategory] = useState()
    const [subCategories, setSubCategories] = useState()
    const [catName, setCatName] = useState(null)
    const [showEle, setShowEle] = useState(false)
    const [pageLoading, setpageLoading] = useState(true)

    // Get Categories
    function getCategories() {
      axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({data}) => {
        setpageLoading(false)
        setCategories(data.data)
      }).catch((error) => {
        setpageLoading(false)
        return error;
      })
    }
    

        // Get Sub-Categories
    function getSubCategoryId(id, name) {
      getSubCategory(id)
      setCatName(name)
      setShowEle(true)
      axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
      .then(({data}) => {
        setSpecificCategory(data.data)
        getSubCategory(id)
      }).catch((error) => error)

      
    }

    
    function getSubCategory(subId) {
      let subCat = specificCategory?.filter((cat) => cat?.category === subId)
      setSubCategories(subCat)
    }

    document.querySelectorAll('.cat').forEach((ele) => {
      ele.onClick = () => {
        document.querySelector('subCat').classList.remove('hidden')
      }
    })

    

    useEffect(() => {
      getCategories()
    })

  return <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    {pageLoading ? <div className="spinner bg-black bg-opacity-50 flex justify-center items-center h-lvh">
      <i className='fas fa-spinner fa-spin text-6xl text-white'></i>
      </div> :<div className='container py-24'>
        <div className="categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {categories?.map((cat) => <div onClick={() => {getSubCategoryId(cat?._id, cat?.name)}} key={cat?._id} className={`${style.cat} overflow-hidden rounded-md border-2 border-green-100 duration-500`}>
            <div className={`${style.img} flex justify-center items-center overflow-hidden box-border`}>
              <img src={cat?.image} className={`cardImg w-full`} alt={cat?.name} />
            </div>
            <p className="title text-2xl font-semibold text-center py-5 text-green-600">{cat?.name}</p>
          </div> )}

        </div>
        {showEle? <div className="subCat py-7">
          <h2 className='text-3xl text-green-600 font-semibold text-center'>{catName? catName : ''} subcategories</h2>
          <div className="subCatCards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-5">
            {subCategories?.map((subCategory) => <div key={subCategory?._id} className={`${style.subCatCard} duration-500 border border-1 border-gray-300 rounded-md text-center px-3 py-4`}>
              <p className='text-3xl font-semibold'>{subCategory?.name}</p>
            </div> )}

          </div>
        </div> : null}
    </div>}
  </>
    }

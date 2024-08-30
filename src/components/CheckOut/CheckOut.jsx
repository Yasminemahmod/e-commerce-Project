import React, { useContext, useState , useEffect} from 'react'
import style from './CheckOut.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { Helmet } from 'react-helmet'


export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(false)
  let {checkOut} = useContext(CartContext)
  let {id} = useParams()

    async function handleCheckOut(cartId, url) {  
      setIsLoading(true)
      let {data} = await checkOut(cartId, url, formik.values)      
      if(data.status === 'success') {  
        setIsLoading(false)
        window.location.href = data.session.url
      } else if(data.statusMsg === 'fail') {
        setIsLoading(false)
      }
    }


    const formik = useFormik({
      initialValues: {
        details: '',
        phone: '',
        city: '',
      },
      onSubmit: ()=> handleCheckOut(id, window.location.origin)
    })
    


  return <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Check Out</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="checkOut py-32">
      <div className="container">
      <form onSubmit={formik.handleSubmit}>

        <div className="mb-5">
          <label htmlFor="details" className="block mb-1 text-base font-normal text-gray-900 dark:text-white">Details :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} name="details" type="text" id="details" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"/>
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-1 text-base font-normal text-gray-900 dark:text-white">phone :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" type="tel" id="phone" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"/>
        </div>
        
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-1 text-base font-normal text-gray-900 dark:text-white">city :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} name="city" type="text" id="city" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"/>
        </div>

          <div className="div mt-20">
              <button type="submit" className="block w-full rounded-lg px-4 py-2 text-base duration-500 border border-green-600 bg-transparent text-green-600 hover:bg-green-600 hover:text-white" disabled={!(formik.isValid && formik.dirty)} >
                {isLoading ? <i className='fas fa-spinner fa-spin'></i>:'Pay now'}
              </button>
          </div>
      </form>
      </div>
    </div>
  </>
}

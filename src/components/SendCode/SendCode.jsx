import React, { useState } from 'react'
import style from './SendCode.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function SendCode() {
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()

    let validationSchema = Yup.object().shape({
      email: Yup.string().email('Email pattern is inavalid').required('Email is required'),
    })
    
    async function sendCode(values) {
      setIsLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      if(data.statusMsg === 'success') {
        setIsLoading(false)
        navigate('/verify-code')
      }
    }
    
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validationSchema,
      onSubmit:sendCode
    })


  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>E-commerce | Verify Rsest Code</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="send-code py-20">
      <div className="container">
        <h2 className='text-3xl font-semibold pb-5'>reset your account password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div class="relative mb-5">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" type="email" id="email" aria-describedby="floating_helper_text" className="block rounded-md px-2 py-3 w-full text-sm text-gray-900  border-1 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3.5 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">email :</label>
          </div>
          {/* Alert */}
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div> : null}


          {/* Api Alert */}
          {apiError ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div> : null}

          <button type="submit" className="rounded-lg px-4 py-2 text-xl border border-green-600 text-green-600 duration-300 hover:bg-green-600 hover:text-white" disabled={!(formik.isValid && formik.dirty)} >
            {isLoading ? <i className='fas fa-spinner fa-spin'></i>:'Verify'}
          </button>
        </form>
      </div>
    </div>
  </>
}

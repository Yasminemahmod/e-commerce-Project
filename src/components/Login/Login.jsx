import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { jwtDecode } from 'jwt-decode'
import { Helmet } from 'react-helmet'


export default function Login() {
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let {setUserLogin} = useContext(UserContext)
    let navigate = useNavigate()
    
    // Yup Validation
    let validationSchema = Yup.object().shape({
      email: Yup.string().email('Email pattern is inavalid').required('Email is required'),
      password: Yup.string().matches(/^[A-Za-z]\w{6,9}$/).required('Password is required'),
    })

    // onSubmit methods
    function handleLogin(values) {
      setIsLoading(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((apiResponse) => {
        localStorage.setItem('userToken', apiResponse.data.token)
        setUserLogin(apiResponse.data.token)
        setIsLoading(false)
        navigate('/')
      })
      .catch((apiResponse) => {
        setIsLoading(false)
        setApiError(apiResponse?.response?.data?.message)
      })
    }

    // Formik
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit:handleLogin
    })


  return <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-commerce | Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="login py-32">
      <div className="container">
        <h2 className='text-3xl font-semibold pb-5'>Login Now</h2>
        <form onSubmit={formik.handleSubmit}>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-1 text-base font-normal text-gray-900 dark:text-white">Email :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" type="email" id="text" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"/>
          </div>
          {/* Alert */}
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div> : null}


          <div className="mb-5">
            <label htmlFor="password" className="block mb-1 text-base font-normal text-gray-900 dark:text-white">Password :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" type="password" id="password" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"/>
          </div>
          {/* Alert */}
          {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div> : null}


          {/* Api Alert */}
          {apiError ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div> : null}

          
            <div className="div flex justify-between">
                <p className='hover:text-green-600 text-xl font-semibold'><Link to={'/forget-password'}>Forget your password ?</Link></p>
                <button type="submit" className=" block rounded-lg px-4 py-3 text-xl bg-green-600 hover:bg-green-700 text-white" disabled={!(formik.isValid && formik.dirty)}>
                  {isLoading ? <i className='fas fa-spinner fa-spin'></i>:'Login Now'}
                </button>
            </div>
        </form>
      </div>
    </div>
  </>
}

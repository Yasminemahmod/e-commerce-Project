import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { Helmet } from 'react-helmet'


export default function Register() {
    const [isDisabled, setIsDisabled] = useState(true)
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let {setUserContext} = useContext(UserContext)

    let navigate = useNavigate()
    

    const passMsg = `must be
    * Start with a letter (either uppercase or lowercase). \n* Be between 6 and 9 characters in total. \n* Cab only contain letters (A-Z or a-z) and numbers (0-9)`
    let validationSchema = Yup.object().shape({
      name: Yup.string().min(3,'Name min length is 3').required('Name is required'),
      email: Yup.string().email('Email pattern is inavalid').required('Email is required'),
      password: Yup.string().matches(/^[A-Za-z]\w{6,9}$/,passMsg).required('Password is required'),
      rePassword: Yup.string().oneOf([Yup.ref('password')],'Re-Password pattern is inavalid').required('Re-Password is required'),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/,'Invalid Phone').required('Re-Password is required')
    })

    
    function handleRegister(values) {
      setIsLoading(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then((apiResponse) => {
        localStorage.setItem('userToken', apiResponse.data.token)
        setUserContext(apiResponse.data.token)
        setIsLoading(false)
        setIsDisabled(false);
        navigate('/login')
      })
      .catch((apiResponse) => {
        setIsLoading(false)
        setApiError(apiResponse?.response?.data?.message)
      })
    }



    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
      },
      validationSchema,
      onSubmit:handleRegister
    })


  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>E-commerce | Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="register py-10">
      <div className="container">
      <h2 className='text-3xl font-semibold pb-5'>Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-1 text-base font-normal text-gray-900 dark:text-white">Name :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" type="text" id="name" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"/>
        </div>
        {/* Alert */}
        {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.name}
        </div> : null}


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

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-1 text-base font-normal text-gray-900 dark:text-white">Re-password :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword" type="password" id="rePassword" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"/>
        </div>
        {/* Alert */}
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.rePassword}
        </div> : null}


        <div className="mb-5">
          <label htmlFor="phone" className="block mb-1 text-base font-normal text-gray-900 dark:text-white">Phone :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" type="tel" id="phone" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"/>
        </div>
        {/* Alert */}
        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div> : null}


        {/* Api Alert */}
        {apiError ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div> : null}


        <button type="submit" className="ms-auto block rounded-lg px-4 py-3 text-xl bg-green-600 hover:bg-green-700 text-white" disabled={!(formik.isValid && formik.dirty)}>
          {isLoading ? <i className='fas fa-spinner fa-spin'></i>:'Register Now'}
        </button>
      </form>
      </div>
    </div>
  </>
}

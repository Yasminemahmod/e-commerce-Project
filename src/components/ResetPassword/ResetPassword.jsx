import React, { useState } from 'react'
import style from './ResetPassword.module.css'
import { useFormik, yupToFormErrors } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'


export default function ResetPassword() {
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()

    // Yup Validation
    const passMsg = `must be
    * Start with a letter (either uppercase or lowercase). \n* Be between 6 and 9 characters in total. \n* Cab only contain letters (A-Z or a-z) and numbers (0-9)`
    let validationSchema = Yup.object().shape({
      email: Yup.string().email('Email pattern is inavalid').required('Email is required'),
      newPassword: Yup.string().matches(/^[A-Za-z]\w{6,9}$/,passMsg).required('Password is required'),
    })

    // onSumbit method 
    async function resetPassword(values) {
      setIsLoading(true)
      let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      if(data.token !== null) {
        setIsLoading(false)
        navigate('/login')
      }
    }

    // Formik 
    let formik = useFormik({
      initialValues: {
        email: '',
        newPassword: '',
      },
      validationSchema,
      onSubmit: resetPassword
    })


  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>E-commerce | Reset Password</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
      <div className="send-code py-20">
        <div className="container">
          <h2 className='text-3xl font-semibold pb-5'>reset your account password</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div class="relative mb-5">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" type="email" id="email" aria-describedby="floating_helper_text" className="block rounded-md px-2 py-3 w-full text-sm text-gray-900  border-1 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="email" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">email :</label>
            </div>
            {/* Email Alert */}
            {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div> : null}


            {/* NewPassword Input */}
            <div class="relative mb-5">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} name="newPassword" type="password" id="newPassword" aria-describedby="floating_helper_text" className="block rounded-md px-2 py-3 w-full text-sm text-gray-900  border-1 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="newPassword" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">New Password :</label>
            </div>
            {/* NewPassword Alert */}
            {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.newPassword}
            </div> : null}


            {/* Api Alert */}
            {apiError ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {apiError}
            </div> : null}


            {/* Submit Button */}
            <button type="submit" className="rounded-lg px-4 py-2 text-xl border border-green-600 text-green-600 duration-300 hover:bg-green-600 hover:text-white" disabled={!(formik.isValid && formik.dirty)} >
              {isLoading ? <i className='fas fa-spinner fa-spin'></i>:'Reset Password'}
            </button>
          </form>
        </div>
    </div>
  </>
}

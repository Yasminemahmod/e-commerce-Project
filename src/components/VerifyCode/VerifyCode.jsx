import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function VerifyCode() {
  const [apiError, setApiError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()


  function handleCode(values) {
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    .then((response) => {
      setIsLoading(false)
      navigate('/reset-password')
    }) 
    .catch((error) => {
      setIsLoading(false)
    })  
  }

  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: handleCode
  })

  return <>
      <div className="send-code py-20">
        <div className="container">
          <h2 className='text-3xl font-semibold pb-5'>please enter your verification code </h2>
          <form onSubmit={formik.handleSubmit}>
            <div class="relative mb-5">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} name="resetCode" type="text" id="code" aria-describedby="floating_helper_text" className="block rounded-md px-2 py-3 w-full text-sm text-gray-900  border-1 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="code" className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">code :</label>
            </div>
            {/* Alert */}
            {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.resetCode}
            </div> : null}


            {/* Api Alert */}
            {apiError ? <div className="p-4 mb-4 text-sm border border-red-800 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {apiError}
            </div> : null}

            <button type="submit" className="rounded-lg px-4 py-2 text-xl border border-green-600 text-green-600 duration-300 hover:bg-green-600 hover:text-white" disabled={!(formik.isValid && formik.dirty)}>
              {isLoading ? <i className='fas fa-spinner fa-spin'></i>:'Verify'}
            </button>
          </form>
        </div>
    </div>
  </>
}

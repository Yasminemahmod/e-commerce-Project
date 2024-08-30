import React, { useState } from 'react'
import style from './NotFound.module.css'
import notFound from '../../assets/Pure-CSS-404-Error-Page.gif'
import { Helmet } from 'react-helmet'


export default function NotFound() {
    const [state, setState] = useState()
  return <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="img mt-28 max-w-2xl flex relative start-1/2 -translate-x-1/2">
      <img className='w-full' src={notFound} alt="Not Found" />
    </div>
  </>
}

import React, { useState } from 'react'
import style from './Orders.module.css'
import { Helmet } from 'react-helmet'


export default function Orders() {
    const [state, setState] = useState()

  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <h1 className='mt-20'>Orders</h1>
  </>
}

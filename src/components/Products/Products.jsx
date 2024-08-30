import React, { useEffect } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import { Helmet } from 'react-helmet'


export default function Products() {
  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="mt-28">
      <RecentProducts />
    </div>
  </>
}

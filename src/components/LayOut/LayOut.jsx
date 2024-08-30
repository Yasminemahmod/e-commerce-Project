import React, { useState } from 'react'
import style from './LayOut.module.css'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'


export default function LayOut() {
    const [state, setState] = useState()
  return <>
    <div>
      <NavBar />
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  </>
}

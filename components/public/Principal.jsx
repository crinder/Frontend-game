import React from 'react'
import Header from './Header'
import Footer from './Footer'
import SupraHeader from './SupraHeader'
import { Outlet } from 'react-router-dom'

const Principal = () => {
  return (
    <div className='div__principal'>
        <SupraHeader/>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Principal
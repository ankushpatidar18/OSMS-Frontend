import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import TopLine from './landing_page_components/TopLine'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div>
      <TopLine/>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default AppLayout

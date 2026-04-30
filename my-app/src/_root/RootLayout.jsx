import React from 'react'
import SidebarComponent from '../components/SidebarComponent'
import { Outlet } from 'react-router-dom'
import Home from './pages/Home'

const RootLayout = () => {
  return (
    <div>
      <SidebarComponent/>
      <section>
        <Home/>
      </section>
    </div>
  )
}

export default RootLayout

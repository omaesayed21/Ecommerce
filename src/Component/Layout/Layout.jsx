import React from 'react'
import Navabar from '../Navbar/Navabar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
  <>
  <Navabar></Navabar>
  <Outlet></Outlet>
  <Footer></Footer>
  </>
  )
}

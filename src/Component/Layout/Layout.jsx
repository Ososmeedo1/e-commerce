import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { Offline } from "react-detect-offline";
export default function Layout() {
  return <>
    <Navbar />
    <div className="container">
      <Offline><div className="loading"><h2 className='alert alert-danger fw-bold'>Offline !</h2></div></Offline>
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}

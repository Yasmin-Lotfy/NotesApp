import React from 'react'
import Navbar from '../Navbar/Navbar';
import {Outlet} from "react-router-dom"
import Home from '../Home/Home';

function Layout() {


  
  return (
    <>
      <Navbar/>
      {/* <Home/> */}
    <Outlet/>
   
    </>
  
    
  )
}

export default Layout
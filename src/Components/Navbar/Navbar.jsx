import React, { useState } from 'react'
import style from "./Navbar.module.css"
import {Link, useNavigate} from "react-router-dom"


function Navbar() {
  let navigate = useNavigate()
  let userToken =localStorage.getItem("userToken");

  console.log(userToken)

  function logutOutUser(){
  localStorage.removeItem("userToken");
  navigate("/")
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="home">Notes App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

      {!userToken ? <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
      </> :""}
       
        {userToken?  <li className="nav-item">
          <Link onClick={logutOutUser} className="nav-link" to="">Logout</Link>
        </li> : "" }

       
      
      </ul>
    
    </div>
  </div>
</nav>
    
    </>

    )
}

export default Navbar
import React from 'react'
import './scss/style.scss'
import img from  "./scss/img/logo-white.png";

const Nav = () => {
  return (
    <nav class="nav">
    <div class="nav__logo-box">
        <img src={img} alt="logo" class="logo"/>
        </div>
        
        <div class="nav__navbar">
            <li class="navlink"><a href="#">Home</a></li>
            <li class="navlink"><a href="#">About</a></li>
            <li class="navlink"><a href="#">Projects</a></li>
            <li class="navlink"><a href="#">Contact</a></li>
        </div>
        <div class="burger">
            <i class="fas fa-bars"></i>
        </div>
   </nav>     
  )
}

export default Nav
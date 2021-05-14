import React from 'react'
import img from  "./scss/img/logo-white.png";

const Nav = () => {
  return (
    <nav className="nav">
    <div className="nav__logo-box">
        <img src={img} alt="logo" className="logo"/>
        </div>
        
        <div className="nav__navbar">
            <li className="navlink"><a href="#">Home</a></li>
            <li className="navlink"><a href="#">About</a></li>
            <li className="navlink"><a href="#">Projects</a></li>
            <li className="navlink"><a href="#">Contact</a></li>
        </div>
        <div className="burger">
            <i className="fas fa-bars"></i>
        </div>
   </nav>     
  )
}

export default Nav
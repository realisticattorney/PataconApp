import React from 'react'
import img from  "./scss/rocket-logo.png";

const Nav = () => {
  return (
    <nav className="nav">
    <div className="nav__logo-box">
        <img src={img} alt="logo" className="logo"/>
        </div>
        
        <div className="nav__navbar">
            <li className="navlink">App</li>
            <li className="navlink">Projects</li>
            <li className="navlink">Contact</li>
        </div>
        <div className="burger">
            <i className="fas fa-bars"></i>
        </div>
   </nav>     
  )
}

export default Nav
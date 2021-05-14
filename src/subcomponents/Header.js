import React from 'react'
import Nav from "../subcomponents/Nav";
import './scss/style.scss'
const Header = () => {
  return (
    <div>
      <Nav/>
          <header className="header">
        <div className="header__text-box">
            <h1 className="heading-primary">
                <span className="heading-primary--main">dolar</span>
                <span className="heading-primary--sub">peso</span>
            </h1>
            <a href="#" className="btn btn--white">Convertir</a>
        </div>
    </header>
    </div>
  )
}

export default Header

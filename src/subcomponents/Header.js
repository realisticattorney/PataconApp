import React from 'react'
import Nav from "../subcomponents/Nav";
import './scss/style.scss'
const Header = () => {
  return (
    <div>
      <Nav/>
          <header class="header">
        <div class="header__text-box">
            <h1 class="heading-primary">
                <span class="heading-primary--main">dolar</span>
                <span class="heading-primary--sub">peso</span>
            </h1>
            <a href="#" class="btn btn--white">Convertir</a>
        </div>
    </header>
    </div>
  )
}

export default Header

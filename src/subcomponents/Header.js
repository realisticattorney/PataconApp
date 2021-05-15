import React from "react";
import Nav from "../subcomponents/Nav";
import Main from "../subcomponents/Main";
import "./scss/style.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="shadow">
      <Nav />
      <div className="App">
        <Main />
      </div>
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">dolar</span>
            <span className="heading-primary--sub">peso</span>
          </h1>
          <Link to="/app">
            <div class="frame">
              <button class="custom-btn btn-7">
                <span>Get MNM today</span>
              </button>
     
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;

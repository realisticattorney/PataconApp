import React from "react";
import Nav from "../subcomponents/Nav";
import App from "../components/App";
import "./scss/style.scss";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const Header = () => {
  const scrollTo = () => {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <div className="shadow">
      <Nav />
      <div className="shadoww">
        <header className="header">
          <div className="header__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">1 eth</span>
              <span className="heading-primary--sub">= 1 peso</span>
            </h1>
            <div class="frame">
              <button
                class="custom-btn btn-7 test1"
                to="test1"
                onClick={() => scrollTo()}
              >
                <span>Get MNM today</span>
              </button>
            </div>
          </div>
        </header>
      </div>
      <div name="scroll-to-element" className="element">
        <App />
      </div>
    </div>
  );
};

export default Header;

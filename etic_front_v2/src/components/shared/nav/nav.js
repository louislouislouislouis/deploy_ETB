//React Necessities
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// Custom Component
import Menu from "./menu/menu";
import Cart from "./cart/cart";
import ShearchBar from "../shearch_bar/shearchBar";
// Style
import "./nav.css";
import Logo from "./logo/logo";

const MainNav = (props) => {
  const url = useLocation();
  return (
    <div className="header">
      <ul className="main_ul">
        <li>
          <Logo />
        </li>
        {url.pathname === "/" ? (
          <li>
            <Menu />
          </li>
        ) : (
          <li>
            <ShearchBar relative />
          </li>
        )}
        <li>
          <Cart />
        </li>
      </ul>
    </div>
  );
};

export default MainNav;

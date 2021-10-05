// React Necessities
import React from "react";
import { NavLink } from "react-router-dom";

// Assets
import logo from "../../../../assets/img/logo.png";

// Style
import "./logo.css";

const Logo = () => {
  return (
    <div className="div_logo">
      <NavLink to="/">
        <img src={logo} alt="" />
      </NavLink>
    </div>
  );
};

export default Logo;

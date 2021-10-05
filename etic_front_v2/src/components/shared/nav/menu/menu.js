// React Necessities
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Assets
import arrow from "../../../../assets/icon/arrow.png";

// Style
import "./menu.css";

const Menu = () => {
  const [categorie_develop_mode, setcategorie_develop_mode] = useState(false);
  const handle_categorie_develop_mode = () => {
    setcategorie_develop_mode((last) => !last);
  };
  return (
    <ul className="central_menu">
      <li className="central_menu_li">
        <div className="cat">
          <div className="IconNav" onClick={handle_categorie_develop_mode}>
            <img
              className={`${
                categorie_develop_mode ? "img_normal" : "img_reverse"
              }`}
              src={arrow}
              alt="arrow"
            />
            Catégories
          </div>
          <div
            className={`choose_mode_container ${
              categorie_develop_mode ? "out" : "in"
            }`}
          >
            <ul className={`develop_mode`}>
              <li>Omnipratique</li>
              <li>Implantologie</li>
              <li>Orthodontie</li>
              <li>Les + gros succès</li>
              <li>Dernières nouveautés</li>
            </ul>
          </div>
        </div>
      </li>
      <li className="central_menu_li">
        <NavLink to="recommendations">
          <div className="IconNav">Recommendations</div>
        </NavLink>
      </li>
      <li className="central_menu_li">
        <NavLink to="/fournisseur">
          <div className="IconNav">Espace fournisseur</div>
        </NavLink>
      </li>
      <li className="central_menu_li">
        <NavLink to="/contact">
          <div className="IconNav">Contact</div>
        </NavLink>
      </li>
    </ul>
  );
};

export default Menu;

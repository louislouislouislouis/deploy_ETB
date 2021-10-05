import React from "react";
import { useLocation } from "react-router-dom";

import "./footer.css";

const Footer = () => {
  const url = useLocation();
  return (
    <React.Fragment>
      <div className={`footer `}>
        {url.pathname !== "/" && (
          <div className="bottom_infos">
            <div className="space">
              <div className="title">Mieux nous connaitre</div>
              <div className="option">
                <ul>
                  <li>Qui sommes nous ?</li>
                </ul>
              </div>
            </div>
            <div className="space">
              <div className="title">Pour faire votre promotion</div>
              <div className="option">
                <ul>
                  <li>Espace fournisseur</li>
                  <li>Partenaires</li>
                </ul>
              </div>
            </div>
            <div className="space">
              <div className="title">Besoin d’information ?</div>
              <div className="option">
                <ul>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className={`bott_foot ${url.pathname === "/" ? "" : "ft_sb"}`}>
          <ul className="main_footer">
            <li className="subfooter_left">© 2021 Essential Tooth Box</li>
            <ul className="subfooter_right">
              <li>Mention Légales</li>
              <li>Plan du site</li>
              <li>Politique de confidentialité</li>
            </ul>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;

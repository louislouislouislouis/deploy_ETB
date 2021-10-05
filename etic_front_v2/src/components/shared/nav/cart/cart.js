// React Necessities
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Assets
import panier from "../../../../assets/icon/panier.png";
import { CartContext } from "../../../../context/cart-context";

// Styles
import "./cart.css";

const Cart = () => {
  const cart = useContext(CartContext);
  const [number, setnumber] = useState(0);
  const [highlight, sethighlight] = useState(false);
  useEffect(() => {
    sethighlight(true);
    let total = 0;
    Object.keys(cart.cart.products).forEach((product) => {
      total += cart.cart.products[product].quantity;
    });
    setnumber(total);
    setTimeout(() => {
      sethighlight(false);
    }, 1010);
  }, [cart.cart.products]);

  return (
    <NavLink to="/cart">
      <div className="cart">
        {number !== 0 && (
          <div className={`rounded ${highlight ? "bigggi" : ""}`}>
            <div className="number">{number}</div>
          </div>
        )}
        <img src={panier} alt="panier" />
        Panier
      </div>
    </NavLink>
  );
};

export default Cart;
